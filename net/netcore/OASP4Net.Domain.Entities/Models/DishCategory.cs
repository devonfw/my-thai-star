namespace OASP4Net.Domain.Entities.Models
{
    public partial class DishCategory
    {
        public long Id { get; set; }
        public long IdDish { get; set; }
        public long IdCategory { get; set; }
        public int? ModificationCounter { get; set; }

        public Category IdCategoryNavigation { get; set; }
        public Dish IdDishNavigation { get; set; }
    }
}
