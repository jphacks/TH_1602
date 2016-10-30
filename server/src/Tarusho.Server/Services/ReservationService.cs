using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Tarusho.Server.Extensions;
using Tarusho.Server.Models;
using Tarusho.Server.Models.Api;
using Tarusho.Server.Models.Data;

namespace Tarusho.Server.Services
{
    public class ReservationService
    {

        private readonly ReservationOptions _options;

        public ReservationService(IOptions<ReservationOptions> options)
        {
            _options = options.Value;
        }

        public void OnAddReservation(Reservation item)
        {
            if (_options.IsOutgoingEnabled)
            {
                var data = item.ToApiModel();
                var dataString = JsonConvert.SerializeObject(data);
                NotifyToOutgoing("AddReservation", dataString);
            }

        }

        public void OnAddReservationUser(ReservationUser item)
        {
            if (_options.IsOutgoingEnabled)
            {
                var data = item.ToApiModel();
                var dataString = JsonConvert.SerializeObject(data);
                NotifyToOutgoing("AddReservationUser", dataString);

            }
        }

        public void OnEditReservation(Reservation item)
        {
            if (_options.IsOutgoingEnabled)
            {
                var data = item.ToApiModel();
                var dataString = JsonConvert.SerializeObject(data);
                NotifyToOutgoing("EditReservation", dataString);
            }
        }

        public void OnRemoveReservation(Reservation item)
        {
            if (_options.IsOutgoingEnabled)
            {
                var data = item.ToApiModel();
                var dataString = JsonConvert.SerializeObject(data);
                NotifyToOutgoing("RemoveReservation", dataString);
            }
        }

        public void OnRemoveReservationUser(ReservationUser item)
        {
            if (_options.IsOutgoingEnabled)
            {
                var data = item.ToApiModel();
                var dataString = JsonConvert.SerializeObject(data);
                NotifyToOutgoing("RemoveReservationUser", dataString);
            }
        }

        public void OnReturnReservation(Reservation item)
        {
            if (_options.IsOutgoingEnabled)
            {
                var data = item.ToApiModel();
                var dataString = JsonConvert.SerializeObject(data);
                NotifyToOutgoing("ReturnReservation", dataString);
            }
        }

            private async void NotifyToOutgoing(string eventName, string content)
        {
            using (var client = new HttpClient())
            {
                var contentObject = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    {"event", eventName},
                    {"content", content}
                });
                await client.PostAsync(_options.OutgoingUri, contentObject);
            }
        }

    }

    public class ReservationOptions
    {
        public bool IsOutgoingEnabled { get; set; }

        public string OutgoingUri { get; set; }
    }

}
