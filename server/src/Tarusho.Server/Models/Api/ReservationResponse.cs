using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Api
{
    public class ReservationResponse
    {
        /// <summary>
        /// ReservationのId
        /// </summary>
        /// <value>ReservationのId</value>
        [DataMember(Name = "id", EmitDefaultValue = false)]
        public string Id { get; set; }
        /// <summary>
        /// Reservationのcomment
        /// </summary>
        /// <value>Reservationのcomment</value>
        [DataMember(Name = "comment", EmitDefaultValue = false)]
        public string Comment { get; set; }
        /// <summary>
        /// Gets or Sets Owner
        /// </summary>
        [DataMember(Name = "owner", EmitDefaultValue = false)]
        public IdNamePair<string> Owner { get; set; }
        /// <summary>
        /// 使用者のユーザーId, 表示名のリスト
        /// </summary>
        /// <value>使用者のユーザーId, 表示名のリスト</value>
        [DataMember(Name = "user", EmitDefaultValue = false)]
        public List<IdNamePair<string>> User { get; set; }
        /// <summary>
        /// Gets or Sets ObjectTag
        /// </summary>
        [DataMember(Name = "object_tag", EmitDefaultValue = false)]
        public IdNamePair<string> ObjectTag { get; set; }
        /// <summary>
        /// 予約を行った日時
        /// </summary>
        /// <value>予約を行った日時</value>
        [DataMember(Name = "created_at", EmitDefaultValue = false)]
        public DateTime? CreatedAt { get; set; }
        /// <summary>
        /// 最終更新日
        /// </summary>
        /// <value>最終更新日</value>
        [DataMember(Name = "modified_at", EmitDefaultValue = false)]
        public DateTime? ModifiedAt { get; set; }
        /// <summary>
        /// 優先度(列挙型にする予定)
        /// </summary>
        /// <value>優先度(列挙型にする予定)</value>
        [DataMember(Name = "priority", EmitDefaultValue = false)]
        public int Priority { get; set; }
        /// <summary>
        /// 予約の開始日時
        /// </summary>
        /// <value>予約の開始日時</value>
        [DataMember(Name = "start_at", EmitDefaultValue = false)]
        public DateTime? StartAt { get; set; }
        /// <summary>
        /// 予約の終了日時
        /// </summary>
        /// <value>予約の終了日時</value>
        [DataMember(Name = "end_at", EmitDefaultValue = false)]
        public DateTime? EndAt { get; set; }
        /// <summary>
        /// 予約の終了が無期限であるかどうか
        /// </summary>
        /// <value>予約の終了が無期限であるかどうか</value>
        [DataMember(Name = "is_endless", EmitDefaultValue = false)]
        public bool? IsEndless { get; set; }

    }
}
