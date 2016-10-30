using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tarusho.Server.Models.Data;

namespace Tarusho.Server.Extensions
{
    public static class QueryableExtension
    {

        public static IEnumerable<Reservation> FilterEnabledReservations(this IEnumerable<Reservation> items)
        {
            // Endlessフラグが付いているもの or 終了時刻が現在時刻より後のものを引っ張ってくる
            return items.Where(c => c.IsEndless || c.EndAt.GetValueOrDefault(DateTime.MaxValue) >= DateTime.Now);
        }
        public static IQueryable<Reservation> FilterEnabledReservations(this IQueryable<Reservation> query)
        {
            // Endlessフラグが付いているもの or 終了時刻が現在時刻より後のものを引っ張ってくる
            return query.Where(c => c.IsEndless || c.EndAt.GetValueOrDefault(DateTime.MaxValue) >= DateTime.Now);
        }

        public static bool IsActiveReservations(this Reservation item)
        {
            if (item.StartAt > DateTime.Now)
                return false;

            // 既に始まっており、さらにEndlessなら or EndAtが空なら...
            if (item.IsEndless || item.EndAt == null)
                return true;

            // あとは終了時刻が現在時刻より後ならtrue, そうでなければ終わっているのでfalse
            return item.EndAt > DateTime.Now;
        }


    }
}
