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

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/users")]
    [Authorize]
    public class UsersController : Controller
    {

        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/users/{user_name}
        [HttpGet("{user_name}")]
        public async Task<IActionResult> GetUserInfo([FromRoute] string user_name)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _context.Users.FirstOrDefaultAsync(m => m.UserName == user_name);
            if (user == null)
                return NotFound();

            return Ok(user.ToApiModel());
        }
    }
}