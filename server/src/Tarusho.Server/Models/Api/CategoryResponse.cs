using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Api
{
    public class CategoryResponse
    {
        /// <summary>
        /// CategoryのId
        /// </summary>
        /// <value>CategoryのId</value>
        [DataMember(Name = "id", EmitDefaultValue = false)]
        public long? Id { get; set; }

        /// <summary>
        /// Categoryの説明
        /// </summary>
        /// <value>Categoryの説明</value>
        [DataMember(Name = "description", EmitDefaultValue = false)]
        public string Description { get; set; }

        /// <summary>
        /// Categoryの表示名
        /// </summary>
        /// <value>Categoryの表示名</value>
        [DataMember(Name = "name", EmitDefaultValue = false)]
        public string Name { get; set; }
    }
}