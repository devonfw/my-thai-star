namespace OASP4Net.Domain.Entities.Models
{
    public partial class DishIngredient
    {
        public long Id { get; set; }
        public long IdDish { get; set; }
        public long IdIngredient { get; set; }
        public int? ModificationCounter { get; set; }

        public Dish IdDishNavigation { get; set; }
        public Ingredient IdIngredientNavigation { get; set; }
    }
}
