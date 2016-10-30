using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tarusho.Server.Data;
using Tarusho.Server.Extensions;
using Tarusho.Server.Models.Api;
using Tarusho.Server.Models.Data;

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/object_tags")]
    public class ObjectTagsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ObjectTagsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ObjectTags/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetObjectTag([FromRoute] string id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var objectTag = await _context.IncludeObjectTagCategory().FirstOrDefaultAsync(m => m.Id == id);

            if (objectTag == null)
                return NotFound();

            return Ok(objectTag.ToApiModel());
        }

        // PUT: api/ObjectTags/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutObjectTag([FromRoute] string id, [FromBody] ObjectTagRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != request.Id)
                return BadRequest();

            var objectTag = await _context.IncludeObjectTagCategory().FirstOrDefaultAsync(m => m.Id == id);
            if (objectTag == null)
                return NotFound();

            if (!_context.Categories.Any(c => c.Id == request.Category))
                return BadRequest();

            objectTag = request.ToDataModel(objectTag);
            
            _context.Entry(objectTag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ObjectTagExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(objectTag.ToApiModel());
        }

        // POST: api/ObjectTags
        [HttpPost]
        public async Task<IActionResult> PostObjectTag([FromBody] ObjectTagRequest request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (!_context.Categories.Any(c => c.Id == request.Category))
                return BadRequest();

            var objectTag = request.ToDataModel();
            _context.ObjectTags.Add(objectTag);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ObjectTagExists(objectTag.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetObjectTag", new { id = objectTag.Id }, objectTag.ToApiModel());
        }

        // DELETE: api/ObjectTags/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteObjectTag([FromRoute] string id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var objectTag = await _context.ObjectTags.FirstOrDefaultAsync(m => m.Id == id);
            if (objectTag == null)
                return NotFound();

            _context.ObjectTags.Remove(objectTag);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool ObjectTagExists(string id)
        {
            return _context.ObjectTags.Any(e => e.Id == id);
        }
    }
}