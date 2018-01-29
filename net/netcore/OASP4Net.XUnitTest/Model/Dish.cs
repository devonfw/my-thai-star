using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class Dish
    {
        public Dish()
        {
            DishCategory = new HashSet<DishCategory>();
            DishIngredient = new HashSet<DishIngredient>();
            OrderLine = new HashSet<OrderLine>();
            UserFavourite = new HashSet<UserFavourite>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Price { get; set; }
        public long? IdImage { get; set; }

        public Image IdImageNavigation { get; set; }
        public ICollection<DishCategory> DishCategory { get; set; }
        public ICollection<DishIngredient> DishIngredient { get; set; }
        public ICollection<OrderLine> OrderLine { get; set; }
        public ICollection<UserFavourite> UserFavourite { get; set; }
    }
}
