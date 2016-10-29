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

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/reservation")]
    [Authorize()]
    [EnableCors("AllowAll")]
    public class ReservationsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ReservationsController(ApplicationDbContext context)
        {
            _context = context;
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

            var reservation = await _context.Reservations.FirstOrDefaultAsync(m => m.Id == id);

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

            var reservation = await _context.Reservations.FirstOrDefaultAsync(m => m.Id == id);

            var user = await GetApplicationUser();
            if (user.Id != reservation.OwnerUserId)
                return Forbid();

            reservation = item.ToDataModel(user.Id, reservation);
            _context.Entry(reservation).State = EntityState.Modified;

            try
            {
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

            return Ok(reservation.ToApiModel());
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
            var reservation = item.ToDataModel(user.Id);

            _context.Reservations.Add(reservation);
            try
            {
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

            return CreatedAtAction("GetReservation", new { id = reservation.Id }, reservation.ToApiModel());
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

        private async Task RemoveReservationUser(List<ReservationUser> items)
        {
            
        }

        private async Task RegisterReservationUser(List<string> userIds, Reservation reservation)
        {

        }

    }
}