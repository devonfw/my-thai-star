using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class Category
    {
        public Category()
        {
            DishCategory = new HashSet<DishCategory>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public long? ShowOrder { get; set; }
        public long? ModificationCounter { get; set; }

        public ICollection<DishCategory> DishCategory { get; set; }
    }
}
