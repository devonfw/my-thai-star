using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class DishCategory
    {
        public long Id { get; set; }
        public long IdDish { get; set; }
        public long IdCategory { get; set; }
        public long? ModificationCounter { get; set; }

        public Category IdCategoryNavigation { get; set; }
        public Dish IdDishNavigation { get; set; }
    }
}
