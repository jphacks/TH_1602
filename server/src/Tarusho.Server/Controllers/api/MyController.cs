using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarusho.Server.Data;
using Tarusho.Server.Models;
using Microsoft.EntityFrameworkCore;
using Tarusho.Server.Extensions;
using Tarusho.Server.Models.Api;

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/my")]
    [Authorize]
    public class MyController : Controller
    {

        private readonly ApplicationDbContext _context;

        public MyController(ApplicationDbContext context)
        {
            _context = context;
        }

        // PUT: api/update_profile
        [HttpPut("update_profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UserInfoRequest item)
        {
            var myUser = await GetApplicationUser();
            if (myUser == null)
                return BadRequest();

            myUser.DisplayName = item.DisplayName;
            await _context.SaveChangesAsync();

            return Ok(myUser.ToApiModel());
        }

        // PUT: api/update_profile_image
        [HttpPut("update_profile_image")]
        public async Task<IActionResult> UpdateProfileImage()
        {
            var myUser = await GetApplicationUser();
            if (myUser == null)
                return BadRequest();

            // TODO: アップロード処理

            return Ok();
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetMyStatus()
        {
            var myUser = await GetApplicationUserWithContext();
            if (myUser == null)
                return BadRequest();

            var temp = new UserReservationStatus()
            {
                ReservedItems = myUser.OwnReservations
                                      .FilterEnabledReservations()
                                      .Select(c => c.ToOverViewApiModel())
                                      .ToList(),
                AssignedItems = myUser.ReservationUsers
                                      .Select(c => c.Reservation)
                                      .FilterEnabledReservations()
                                      .Select(c => c.ToOverViewApiModel())
                                      .ToList()
            };

            return Ok(temp);
        }

        private async Task<ApplicationUser> GetApplicationUser()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var appUser = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            return appUser;
        }
        private async Task<ApplicationUser> GetApplicationUserWithContext()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var appUser = await _context.Users.Include(c => c.OwnReservations).ThenInclude(m => m.ObjectTag)
                                              .Include(c => c.ReservationUsers).ThenInclude(u => u.Reservation).ThenInclude(m => m.ObjectTag)
                                              .FirstOrDefaultAsync(user => user.Id == userId);
            return appUser;
        }


    }
}