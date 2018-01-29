using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class Ingredient
    {
        public Ingredient()
        {
            DishIngredient = new HashSet<DishIngredient>();
            OrderDishExtraIngredient = new HashSet<OrderDishExtraIngredient>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }

        public ICollection<DishIngredient> DishIngredient { get; set; }
        public ICollection<OrderDishExtraIngredient> OrderDishExtraIngredient { get; set; }
    }
}
