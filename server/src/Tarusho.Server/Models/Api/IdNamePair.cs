using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Api
{
    public class IdNamePair<T>
    {
        /// <summary>
        /// Id field
        /// </summary>
        /// <value>Id field</value>
        [DataMember(Name = "id", EmitDefaultValue = false)]
        public T Id { get; set; }
        /// <summary>
        /// Name field
        /// </summary>
        /// <value>Name field</value>
        [DataMember(Name = "name", EmitDefaultValue = false)]
        public string Name { get; set; }

    }
}