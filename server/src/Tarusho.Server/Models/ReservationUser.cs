using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tarusho.Server.Models.Data;

namespace Tarusho.Server.Models
{
    public class ReservationUser
    {
        public string ReservationId { get; set; }

        public Reservation Reservation { get; set; }

        public string UserId { get; set; }
        
        public ApplicationUser User { get; set; }

    }
}
