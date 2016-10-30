using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarusho.Server.Data;
using Microsoft.EntityFrameworkCore;
using Tarusho.Server.Extensions;
using Tarusho.Server.Services;

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/return")]
    [Authorize()]
    public class ReturnController : Controller
    {
        private readonly ApplicationDbContext _context;

        private readonly ReservationService _reservationService;


        public ReturnController(ApplicationDbContext context, ReservationService service)
        {
            _context = context;
            _reservationService = service;
        }

        // GET: api/return/{reservation_id}
        [HttpGet("{reservation_id}")]
        public async Task<IActionResult> CompleteReservation([FromRoute] string reservation_id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var reservation = await _context.Reservations.FirstOrDefaultAsync(c => c.Id == reservation_id);
            if (reservation == null)
                return NotFound();

            if (!reservation.IsActiveReservations())
                return Forbid();

            reservation.IsEndless = false;
            reservation.EndAt = DateTime.Now;

            await _context.SaveChangesAsync();

            _reservationService.OnReturnReservation(reservation);

            return Ok();
        }
    }
}