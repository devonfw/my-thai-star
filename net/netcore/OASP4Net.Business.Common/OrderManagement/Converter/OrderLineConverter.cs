using System;
using System.Linq;
using OASP4Net.Business.Common.DishManagement.Converter;
using OASP4Net.Business.Common.OrderManagement.Dto;
using OASP4Net.Domain.Entities.Models;

namespace OASP4Net.Business.Common.OrderManagement.Converter
{
    public class OrderLineConverter
    {
        public static OrderlineFullResponse EntityToApi(OrderLine item)
        {
            try
            {
                if (item == null) return new OrderlineFullResponse();
                var price = item.IdDishNavigation.Price != null ? decimal.Round(item.IdDishNavigation.Price.Value, 2, MidpointRounding.AwayFromZero) : 0;
                return new OrderlineFullResponse
                {
                    dish = new DishFullResponse
                    {
                        id = item.IdDishNavigation.Id,
                        revision = 0,
                        modificationCounter = 0,
                        name = item.IdDishNavigation.Name,
                        description = item.IdDishNavigation.Description,
                        price = price,
                        imageId = 0
                    },
                    extras = item.OrderDishExtraIngredient.ToList().Select(ExtraIngredientonverter.EntityToApi).ToList(),
                    orderLine = new OrderlineDetailFullResponse
                    {
                        id = item.Id,
                        revision = 0,
                        modificationCounter = 0,
                        orderId = item.IdOrder,
                        amount = item.Amount ?? 0,
                        comment = item.Comment,
                        dishId = item.IdDish
                    }
                };
            }
            catch (Exception ex)
            {
                var msg = $"{ex.Message} : {ex.InnerException}";
            }

            return new OrderlineFullResponse();
        }
    }
}
