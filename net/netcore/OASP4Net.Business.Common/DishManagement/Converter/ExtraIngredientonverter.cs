using OASP4Net.Business.Common.OrderManagement.Dto;
using OASP4Net.Domain.Entities.Models;

namespace OASP4Net.Business.Common.DishManagement.Converter
{
    public class ExtraIngredientonverter
    {
        public static Extra EntityToApi(OrderDishExtraIngredient item)
        {
            if (item == null) return new Extra();

            return new Extra
            {
                id = item.Id,
                description = item.IdIngredientNavigation.Description,
                modificationCounter = null,
                name = item.IdIngredientNavigation.Name,
                price = item.IdIngredientNavigation.Price,
                revision = 1

            };

        }
    }
}
