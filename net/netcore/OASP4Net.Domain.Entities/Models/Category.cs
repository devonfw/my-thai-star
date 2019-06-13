using System.Collections.Generic;

namespace OASP4Net.Domain.Entities.Models
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
        public int? ShowOrder { get; set; }
        public int? ModificationCounter { get; set; }

        public ICollection<DishCategory> DishCategory { get; set; }
    }
}
