using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tarusho.Server.Models;
using Tarusho.Server.Models.Api;
using Tarusho.Server.Models.Data;

namespace Tarusho.Server.Extensions
{
    public static class ToDataModelExtension
    {

        public static Reservation ToDataModel(this ReservationRequest request, ApplicationUser user, ObjectTag objectTag, Reservation item = null)
        {
            if (item == null)
            {
                item = new Reservation()
                {
                    Id = Guid.NewGuid().ToString(),
                    CreatedAt = DateTime.Now,
                    ModifiedAt = DateTime.Now
                };
            }
            else
            {
                item.Id = request.Id;
            }

            item.Comment = request.Comment;
            item.StartAt = request.StartAt;
            item.EndAt = request.EndAt;
            item.IsEndless = request.IsEndless;

            if (objectTag != null)
            {
                item.ObjectTag = objectTag;
                item.ObjectTagId = objectTag.Id;
            }
            else
            {
                item.ObjectTagId = request.ObjectTagId;
            }

            item.OwnerUser = user;
            item.OwnerUserId = user.Id;
            item.Priority = request.Priority;
            return item;
        }

        public static ObjectTag ToDataModel(this ObjectTagRequest request, Category category = null, ObjectTag item = null)
        {
            if (item == null)
            {
                item = new ObjectTag()
                {
                    Id = Guid.NewGuid().ToString()
                };
            }
            else
            {
                item.Id = request.Id;
            }

            if (category != null)
            {
                item.Category = category;
                item.CategoryId = category.Id;
            }
            else
            {
                item.CategoryId = request.Category;
            }
            item.Description = request.Description;
            item.IsBookingEnabled = request.BookingEnabled;
            item.Name = request.Name;
            item.ObjectUri = request.ObjectUri;
            item.OptionalUri = request.OptionalUri;
            item.Place = request.Place;
            return item;
        }

        public static Category ToDataModel(this CategoryRequest request, Category item = null)
        {
            if (item == null)
            {
                item = new Category() { Id = 0 };
            }
            else
            {
                item.Id = request.Id.GetValueOrDefault(0);
            }

            item.Name = request.Name;
            item.Description = request.Description;
            return item;
        }

    }
}
