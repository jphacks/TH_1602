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
using Microsoft.EntityFrameworkCore;

namespace Tarusho.Server.Controllers.api
{
    [Produces("application/json")]
    [Route("api/search")]
    public class SearchController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SearchController(ApplicationDbContext context)
        {
            _context = context;
        }



        [Route("object_tags")]
        [HttpGet()]
        public async Task<IActionResult> SearchObjectTags(int? category_id = null, string[] keywords = null, int count = 20, int page = 0)
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

        [Route("categories")]
        [HttpGet()]
        public async Task<IActionResult> SearchCategories(string[] keywords = null, int count = 20, int page = 0)
        {
            var items = _context.IncludeCategoryContext().Select(c => c);

            if (keywords != null)
            {
                foreach (var keyword in keywords)
                {
                    items = items.Where(c => c.Name.Contains(keyword) || c.Description.Contains(keyword));
                }
            }

            var temp = new PaginationItem<CategoryResponse>();
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


        [Route("reservations")]
        [HttpGet()]
        public async Task<IActionResult> SearchReservations(
            string object_tag_id = null,
            string user_name = null,
            string[] keywords = null,
            DateTime? since_at = null,
            DateTime? to_at = null,
            bool includes_past = false,
            int count = 20, int page = 0)
        {

            var items = _context.IncludeReservationContext().Select(c => c);

            if (object_tag_id != null)
            {
                items = items.Where(c => c.ObjectTagId == object_tag_id);
            }

            if (user_name != null)
            {
                var user = await _context.Users.FirstOrDefaultAsync(c => c.UserName == user_name);
                if (user != null)
                {
                    items =
                        items.Where(c => c.OwnerUserId == user.Id || c.ReservationUsers.Any(m => m.UserId == user.Id));
                }
            }

            if (keywords != null)
            {
                foreach (var keyword in keywords)
                {
                    items = items.Where(c => c.Comment.Contains(keyword));
                }
            }

            if (!includes_past)
            {
                items = items.FilterEnabledReservations();
            }

            if (since_at != null)
            {
                items = items.Where(c => c.IsEndless || c.EndAt.GetValueOrDefault(DateTime.MaxValue) >= since_at.Value);
            }

            if (to_at != null)
            {
                items = items.Where(c => c.IsEndless || c.StartAt <= to_at.Value);
            }

            var temp = new PaginationItem<ReservationResponse>();
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