using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Api
{
    public class UserReservationStatus
    {

        /// <summary>
        /// 自身が予約を行ったものを示します
        /// </summary>
        /// <value>自身が予約を行ったものを示します</value>
        [DataMember(Name = "reserved_items", EmitDefaultValue = false)]
        public List<ReservationOverviewResponse> ReservedItems { get; set; }
        /// <summary>
        /// 利用者としてアサインされた予約を示します
        /// </summary>
        /// <value>利用者としてアサインされた予約を示します</value>
        [DataMember(Name = "assigned_items", EmitDefaultValue = false)]
        public List<ReservationOverviewResponse> AssignedItems { get; set; }

    }
}
