using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tarusho.Server.Data;
using Tarusho.Server.Extensions;
using Microsoft.EntityFrameworkCore;
using Tarusho.Server.Models.Api;

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/list")]
    [EnableCors("AllowAll")]
    public class ListController : Controller
    {

        private readonly ApplicationDbContext _context;

        public ListController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/list/object_tags
        [Route("categories")]
        [HttpGet()]
        public IActionResult GetCategories(int count = 20, int page = 0)
        {
            var temp = new PaginationItem<CategoryResponse>();
            var source = _context.Categories.Where(c => c.Name != "");

            temp.TotalCount = source.Count();

            // トータルページ数
            temp.TotalPage = (temp.TotalCount - 1) / count;
            if (temp.TotalPage < page)
            {
                temp.CurrentPage = 0;
            }
            else
            {
                temp.CurrentPage = page;
            }

            temp.Items = source.Skip(temp.CurrentPage * count)
                                 .Take(count)
                                 .Select(c => c.ToApiModel())
                                 .ToList();
            return Ok(temp);
        }

        // GET: api/list/object_tags
        [Route("object_tags/{category_id}")]
        [HttpGet()]
        public async Task<IActionResult> GetObjectTags([FromRoute]int category_id, int count = 20, int page = 0)
        {

            var category = await _context.IncludeCategoryContext()
                .FirstOrDefaultAsync(c => c.Id == category_id);
            if (category == null)
                return NotFound();

            var temp = new PaginationItem<ObjectTagResponse>();
            temp.TotalCount = category.ObjectTags.Count();

            // トータルページ数
            temp.TotalPage = (temp.TotalCount - 1) / count;
            if (temp.TotalPage < page)
            {
                temp.CurrentPage = 0;
            }
            else
            {
                temp.CurrentPage = page;
            }

            temp.Items = category.ObjectTags
                                 .Skip((temp.CurrentPage) * count)
                                 .Take(count)
                                 .Select(c => c.ToApiModel())
                                 .ToList();
            return Ok(temp);
        }

        // GET: api/list/object_tags
        [Route("users")]
        [HttpGet()]
        public async Task<IActionResult> GetUsers(int count = 20, int page = 0)
        {
            var users = _context.Users;
            
            var temp = new PaginationItem<UserInfoResponse>();
            temp.TotalCount = users.Count();

            // トータルページ数
            temp.TotalPage = (temp.TotalCount - 1) / count;
            if (temp.TotalPage < page)
            {
                temp.CurrentPage = 0;
            }
            else
            {
                temp.CurrentPage = page;
            }

            temp.Items = users.Skip((temp.CurrentPage) * count)
                              .Take(count)
                              .Select(c => c.ToApiModel())
                              .ToList();
            return Ok(temp);
        }
    }
}