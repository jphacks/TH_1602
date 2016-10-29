using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Api
{
    public class ReservationRequest
    {
        /// <summary>
        /// ReservationのId
        /// </summary>
        /// <value>ReservationのId</value>
        [DataMember(Name = "id", EmitDefaultValue = false)]
        public string Id { get; set; }
        /// <summary>
        /// 予約時の要件
        /// </summary>
        /// <value>予約時の要件</value>
        [DataMember(Name = "comment", EmitDefaultValue = false)]
        public string Comment { get; set; }
        /// <summary>
        /// 使用者のユーザーId
        /// </summary>
        /// <value>使用者のユーザーId</value>
        [DataMember(Name = "user", EmitDefaultValue = false)]
        public List<string> User { get; set; }
        /// <summary>
        /// 予約するObjectTagのId
        /// </summary>
        /// <value>予約するObjectTagのId</value>
        [DataMember(Name = "object_tag_id", EmitDefaultValue = false)]
        public string ObjectTagId { get; set; }
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
        public DateTime StartAt { get; set; }
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
        public bool IsEndless { get; set; }

    }
}
