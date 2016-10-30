using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Data
{
    public class Reservation
    {
        /// <summary>
        /// ReservationのId
        /// </summary>
        /// <value>ReservationのId</value>
        public string Id { get; set; }

        /// <summary>
        /// Reservationのcomment
        /// </summary>
        /// <value>Reservationのcomment</value>
        public string Comment { get; set; }

        public string OwnerUserId { get; set; }
        /// <summary>
        /// Gets or Sets Owner
        /// </summary>
        public ApplicationUser OwnerUser { get; set; }

        /// <summary>
        /// 使用者のユーザーId, 表示名のリスト
        /// </summary>
        /// <value>使用者のユーザーId, 表示名のリスト</value>
        public ICollection<ReservationUser> ReservationUsers { get; set; }

        /// <summary>
        /// Gets or Sets ObjectTag
        /// </summary>
        public string ObjectTagId { get; set; }
        public ObjectTag ObjectTag { get; set; }

        /// <summary>
        /// 予約を行った日時
        /// </summary>
        /// <value>予約を行った日時</value>
        public DateTime CreatedAt { get; set; }

        /// <summary>
        /// 最終更新日
        /// </summary>
        /// <value>最終更新日</value>
        public DateTime ModifiedAt { get; set; }

        /// <summary>
        /// 優先度(列挙型にする予定)
        /// </summary>
        /// <value>優先度(列挙型にする予定)</value>
        public int Priority { get; set; }

        /// <summary>
        /// 予約の開始日時
        /// </summary>
        /// <value>予約の開始日時</value>
        public DateTime StartAt { get; set; }

        /// <summary>
        /// 予約の終了日時
        /// </summary>
        /// <value>予約の終了日時</value>
        public DateTime? EndAt { get; set; }

        /// <summary>
        /// 予約の終了が無期限であるかどうか
        /// </summary>
        /// <value>予約の終了が無期限であるかどうか</value>
        public bool IsEndless { get; set; }

    }
}
