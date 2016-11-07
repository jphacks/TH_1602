using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tarusho.Server.Data;
using Tarusho.Server.Extensions;
using Tarusho.Server.Models;
using Tarusho.Server.Models.Api;
using Tarusho.Server.Models.Data;
using Tarusho.Server.Services;

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/reservation")]
    [Authorize]
    public class ReservationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        private readonly ReservationService _reservationService;


        public ReservationsController(ApplicationDbContext context, ReservationService service)
        {
            _context = context;
            _reservationService = service;
        }

        // GET: api/Reservations
        [HttpGet]
        public IEnumerable<Reservation> GetReservations()
        {
            return _context.Reservations;
        }

        // GET: api/Reservations/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetReservation([FromRoute] string id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var reservation = await _context.IncludeReservationContext().FirstOrDefaultAsync(m => m.Id == id);

            if (reservation == null)
                return NotFound();

            return Ok(reservation.ToApiModel());
        }

        // PUT: api/Reservations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReservation([FromRoute] string id, [FromBody] ReservationRequest item)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != item.Id)
                return BadRequest();

            var reservation = await _context.IncludeReservationContext().FirstOrDefaultAsync(m => m.Id == id);
            if (reservation == null)
                return NotFound();

            var user = await GetApplicationUser();
            if (user.Id != reservation.OwnerUserId)
                return Forbid();

            if (!_context.ObjectTags.Any(c => c.Id == item.ObjectTagId))
                return BadRequest();

            // TODO: �\��\���ǂ����A����
            reservation = item.ToDataModel(user.Id, reservation);
            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
                var userIds = _context.ReservationUsers.Select(c => c.UserId).ToList();
                await RemoveReservationUser(userIds, reservation.Id);

                await _context.SaveChangesAsync();
                _reservationService.OnEditReservation(reservation);

                await RegisterReservationUser(item.Users, reservation);

                await _context.SaveChangesAsync();

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReservationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            var response = await _context.IncludeReservationContext().FirstOrDefaultAsync(c => c.Id == reservation.Id);

            return Ok(response.ToApiModel());
        }

        // POST: api/Reservations
        [HttpPost]
        public async Task<IActionResult> PostReservation([FromBody] ReservationRequest item)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await GetApplicationUser();

            if (!_context.ObjectTags.Any(c => c.Id == item.ObjectTagId))
                return BadRequest();

            var reservation = item.ToDataModel(user.Id);
            // TODO: �\��\���ǂ����A����
            // TODO: ���Ƀ��N�G�X�g�𑗂鏈���Ȃǂ�����...�H

            _context.Reservations.Add(reservation);
            try
            {
                await _context.SaveChangesAsync();

                _reservationService.OnAddReservation(reservation);

                await RegisterReservationUser(item.Users, reservation);
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ReservationExists(reservation.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            var response = await _context.IncludeReservationContext().FirstOrDefaultAsync(c => c.Id == reservation.Id);

            return CreatedAtAction("GetReservation", new { id = reservation.Id }, response.ToApiModel());
        }

        // DELETE: api/Reservations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReservation([FromRoute] string id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var reservation = await _context.Reservations.SingleOrDefaultAsync(m => m.Id == id);
            if (reservation == null)
                return NotFound();

            var user = await GetApplicationUser();
            if (user.Id != reservation.OwnerUserId)
                return Forbid();

            _context.Reservations.Remove(reservation);
            await _context.SaveChangesAsync();

            _reservationService.OnRemoveReservation(reservation);

            return Ok();
        }

        private bool ReservationExists(string id)
        {
            return _context.Reservations.Any(e => e.Id == id);
        }

        private async Task<ApplicationUser> GetApplicationUser()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var appUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            return appUser;
        }

        private async Task RemoveReservationUser(List<string> userIds, string reservationId)
        {
            if (userIds == null)
                return;

            foreach (var userId in userIds)
            {
                var item =
                    _context.ReservationUsers.FirstOrDefault(c => c.ReservationId == reservationId && c.UserId == userId);
                if (item == null)
                    continue;

                _reservationService.OnRemoveReservationUser(item);
                _context.ReservationUsers.Remove(item);
            }
            await _context.SaveChangesAsync();
        }

        private async Task RegisterReservationUser(List<string> userNames, Reservation reservation)
        {
            if (userNames == null)
                return;

            foreach (var userName in userNames)
            {
                var user = _context.Users.FirstOrDefault(c => c.UserName == userName);
                if (user == null)
                    continue;

                var item = new ReservationUser()
                {
                    UserId = user.Id,
                    Reservation = reservation
                };

                _context.ReservationUsers.Add(item);
                _reservationService.OnAddReservationUser(item);
            }
            await _context.SaveChangesAsync();
        }

    }
}