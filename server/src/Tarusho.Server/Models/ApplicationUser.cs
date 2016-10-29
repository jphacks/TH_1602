using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Tarusho.Server.Models.Data;

namespace Tarusho.Server.Models
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {
        public string ProfileImageUri { get; set; }

        public string ProfileThumbnailImageUri { get; set; }

        public string DisplayName { get; set; }

        public ICollection<ReservationUser> ReservationUsers { get; set; }

        public ICollection<Reservation> OwnReservations { get; set; }


    }
}
