using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query;
using Tarusho.Server.Data;
using Tarusho.Server.Extensions;
using Tarusho.Server.Models.Api;

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/search")]
    [EnableCors("AllowAll")]
    [Authorize]
    public class SearchController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SearchController(ApplicationDbContext context)
        {
            _context = context;
        }



        [Route("object_tags")]
        [HttpGet()]
        public async Task<IActionResult> SearchObjectTags(int? category_id= null, string[] keywords = null, int count = 20, int page = 0)
        {
            var items = _context.IncludeObjectTagCategory().Select(c => c);

            if (category_id.HasValue)
            {
                items = items.Where(c => c.CategoryId == category_id.Value);
            }

            if (keywords != null)
            {
                foreach (var keyword in keywords)
                {
                    items = items.Where(c => c.Name.Contains(keyword) || c.Description.Contains(keyword));
                }
            }

            var temp = new PaginationItem<ObjectTagResponse>();
            temp.TotalCount = items.Count();

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

            temp.Items = items.Skip((temp.CurrentPage) * count)
                              .Take(count)
                              .Select(c => c.ToApiModel())
                              .ToList();
            return Ok(temp);
        }


    }
}