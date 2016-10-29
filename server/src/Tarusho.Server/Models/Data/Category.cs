using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Tarusho.Server.Models.Data
{
    public class Category
    {
        public int Id { get; set; }

        [StringLength(30, MinimumLength = 3)]
        public string Name { get; set; }

        [StringLength(1000)]
        public string Description { get; set; }

        public ICollection<ObjectTag> ObjectTags { get; set; }

    }
}
