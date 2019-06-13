using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class DishIngredient
    {
        public long Id { get; set; }
        public long IdDish { get; set; }
        public long IdIngredient { get; set; }
        public long? ModificationCounter { get; set; }

        public Dish IdDishNavigation { get; set; }
        public Ingredient IdIngredientNavigation { get; set; }
    }
}
