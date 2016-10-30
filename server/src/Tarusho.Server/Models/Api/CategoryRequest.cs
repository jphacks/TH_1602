using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Api
{
    public class CategoryRequest
    {
        /// <summary>
        /// CategoryのId
        /// </summary>
        /// <value>CategoryのId</value>
        [DataMember(Name = "id", EmitDefaultValue = false)]
        public int? Id { get; set; }
        /// <summary>
        /// Categoryの説明
        /// </summary>
        /// <value>Categoryの説明</value>
        [StringLength(1000)]
        [DataMember(Name = "description", EmitDefaultValue = false)]
        public string Description { get; set; }
        /// <summary>
        /// Categoryの表示名
        /// </summary>
        /// <value>Categoryの表示名</value>
        [StringLength(30, MinimumLength = 3)]
        [DataMember(Name = "name", EmitDefaultValue = false)]
        public string Name { get; set; }

    }
}
