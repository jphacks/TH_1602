using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Api
{
    public class ObjectTagRequest
    {
        /// <summary>
        /// ObjectTagのId
        /// </summary>
        /// <value>ObjectTagのId</value>
        [DataMember(Name = "id", EmitDefaultValue = false)]
        public string Id { get; set; }
        /// <summary>
        /// 表示名
        /// </summary>
        /// <value>表示名</value>
        [DataMember(Name = "name", EmitDefaultValue = false)]
        public string Name { get; set; }
        /// <summary>
        /// 場所
        /// </summary>
        /// <value>場所</value>
        [DataMember(Name = "place", EmitDefaultValue = false)]
        public string Place { get; set; }
        /// <summary>
        /// オブジェクトのURI
        /// </summary>
        /// <value>オブジェクトのURI</value>
        [DataMember(Name = "object_uri", EmitDefaultValue = false)]
        public string ObjectUri { get; set; }
        /// <summary>
        /// Optional(バーコード)のURI
        /// </summary>
        /// <value>Optional(バーコード)のURI</value>
        [DataMember(Name = "optional_uri", EmitDefaultValue = false)]
        public string OptionalUri { get; set; }
        /// <summary>
        /// 説明文
        /// </summary>
        /// <value>説明文</value>
        [DataMember(Name = "description", EmitDefaultValue = false)]
        public string Description { get; set; }

        /// <summary>
        /// カテゴリId
        /// </summary>
        /// <value>カテゴリId</value>
        [DataMember(Name = "category", EmitDefaultValue = false)]
        public int Category { get; set; }

        /// <summary>
        /// 将来の予約が可能かどうか
        /// </summary>
        [DataMember(Name = "booking_enabled", EmitDefaultValue = false)]
        public bool BookingEnabled { get; set; }
    }
}
