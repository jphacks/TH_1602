using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Query;
using Tarusho.Server.Data;
using Tarusho.Server.Models;
using Tarusho.Server.Models.Data;

namespace Tarusho.Server.Extensions
{
    public static class IncludeRelationsExtension
    {

        public static IIncludableQueryable<Reservation, ApplicationUser> IncludeReservationContext(this ApplicationDbContext context)
        {
            return context.Reservations
                .Include(c => c.ObjectTag)
                .Include(c => c.OwnerUser)
                .Include(c => c.ReservationUsers)
                .ThenInclude(m => m.User);
        }

        public static IIncludableQueryable<ObjectTag, Category> IncludeObjectTagCategory(this ApplicationDbContext context)
        {
            return context.ObjectTags
                .Include(c => c.Category);
        }


        public static IIncludableQueryable<Category, ICollection<ObjectTag>> IncludeCategoryContext(this ApplicationDbContext context)
        {
            return context.Categories
                .Include(c => c.ObjectTags);
        }




    }
}
