using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tarusho.Server.Models.Api;

namespace Tarusho.Server.Models.Data
{
    public class ObjectTag
    {
        /// <summary>
        /// ObjectTagのId
        /// </summary>
        /// <value>ObjectTagのId</value>
        public string Id { get; set; }

        /// <summary>
        /// 表示名
        /// </summary>
        /// <value>表示名</value>
        public string Name { get; set; }

        /// <summary>
        /// 場所
        /// </summary>
        /// <value>場所</value>
        public string Place { get; set; }

        /// <summary>
        /// オブジェクトのURI
        /// </summary>
        /// <value>オブジェクトのURI</value>
        public string ObjectUri { get; set; }

        /// <summary>
        /// Optional(バーコード)のURI
        /// </summary>
        /// <value>Optional(バーコード)のURI</value>
        public string OptionalUri { get; set; }

        /// <summary>
        /// 説明文
        /// </summary>
        /// <value>説明文</value>
        public string Description { get; set; }

        /// <summary>
        /// 画像Uri
        /// </summary>
        /// <value>画像Uri</value>
        public string ImageUri { get; set; }

        public string ThumbnailImageUri { get; set; }

        public ICollection<Reservation> Reservations { get; set; }

        /// <summary>
        /// 将来の予約が可能か
        /// </summary>
        public bool IsBookingEnabled { get; set; }

        /// <summary>
        /// Gets or Sets Category
        /// </summary>
        public int CategoryId { get; set; }

        public Category Category { get; set; }

        public string GetImageUri()
        {
            return "Using Blob";
        }
    }
}
