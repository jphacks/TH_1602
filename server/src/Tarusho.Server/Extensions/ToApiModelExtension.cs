using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tarusho.Server.Data;
using Tarusho.Server.Models;
using Tarusho.Server.Models.Api;
using Tarusho.Server.Models.Data;

namespace Tarusho.Server.Extensions
{
    public static class ToApiModelExtension
    {
        public static ReservationResponse ToApiModel(this Reservation model)
        {
            var temp = new ReservationResponse()
            {
                Id = model.Id,
                Comment = model.Comment,
                CreatedAt = model.CreatedAt,
                StartAt = model.StartAt,
                EndAt = model.EndAt,
                IsEndless = model.IsEndless,
                ModifiedAt = model.ModifiedAt,
                Priority = model.Priority,
                ObjectTag = new IdNamePair<string>() { Id = model.ObjectTagId, Name = model.ObjectTag.Name },
                Owner = new IdNamePair<string>() { Id = model.OwnerUser.UserName, Name = model.OwnerUser.DisplayName },
                User = model.ReservationUsers.Select(c => new IdNamePair<string>() { Id = c.User.UserName, Name = c.User.DisplayName }).ToList()
            };
            return temp;
        }

        public static ObjectTagResponse ToApiModel(this ObjectTag model)
        {
            var temp = new ObjectTagResponse()
            {
                Id = model.Id,
                Name = model.Name,
                Category = new IdNamePair<long>() {Id = model.CategoryId, Name = model.Category.Name},
                ObjectUri = model.ObjectUri,
                OptionalUri = model.OptionalUri,
                InUseReservationId = model.InUseReservationId,
                BookingEnabled = model.IsBookingEnabled,
                Description = model.Description,
                ImageUri = model.GetImageUri(),
                Place = model.Place
            };
            return temp;
        }

        public static CategoryResponse ToApiModel(this Category model)
        {
            var temp = new CategoryResponse()
            {
                Name = model.Name,
                Id = model.Id,
                Description = model.Description
            };
            return temp;
        }

        public static UserInfoResponse ToApiModel(this ApplicationUser model)
        {
            var temp = new UserInfoResponse()
            {
                UserName = model.UserName,
                DisplayName = model.DisplayName,
                ProfileImageUri = model.ProfileImageUri,
                ProfileThumbnailImageUri = model.ProfileThumbnailImageUri
            };
            return temp;
        }

    }
}
