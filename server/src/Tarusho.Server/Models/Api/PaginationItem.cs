using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Api
{
    public class PaginationItem<T>
    {
        /// <summary>
        /// トータル件数
        /// </summary>
        /// <value>トータル件数</value>
        [DataMember(Name = "total_count", EmitDefaultValue = false)]
        public int TotalCount { get; set; }
        /// <summary>
        /// トータルページ数
        /// </summary>
        /// <value>トータルページ数</value>
        [DataMember(Name = "total_page", EmitDefaultValue = false)]
        public int TotalPage { get; set; }
        /// <summary>
        /// 現在のページ
        /// </summary>
        /// <value>現在のページ</value>
        [DataMember(Name = "current_page", EmitDefaultValue = false)]
        public int CurrentPage { get; set; }
        /// <summary>
        /// ここに返り値のリストが挿入されます
        /// </summary>
        /// <value>ここに返り値のリストが挿入されます</value>
        [DataMember(Name = "items", EmitDefaultValue = false)]
        public List<T> Items { get; set; }

    }
}
