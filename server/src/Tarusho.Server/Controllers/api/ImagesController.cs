using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarusho.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/images")]
    public class ImagesController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ImagesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Categories/5
        [HttpGet("object_tags/{id}")]
        public async Task<IActionResult> UploadObjectTagImage([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var objectTag = await _context.ObjectTags.FirstOrDefaultAsync(m => m.Id == id);
            if (objectTag == null)
                return NotFound();

            // TODO: Uploadèàóù

            return Ok();
        }
    }
}