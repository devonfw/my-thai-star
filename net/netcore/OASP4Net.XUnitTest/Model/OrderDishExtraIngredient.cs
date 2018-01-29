using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class OrderDishExtraIngredient
    {
        public long Id { get; set; }
        public long IdOrderLine { get; set; }
        public long IdIngredient { get; set; }

        public Ingredient IdIngredientNavigation { get; set; }
        public OrderLine IdOrderLineNavigation { get; set; }
    }
}
