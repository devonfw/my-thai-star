using System;
using System.Collections.Generic;
using OASP4Net.Business.Common.DishManagement.Dto;
using OASP4Net.Domain.Entities.Models;

namespace OASP4Net.Business.Common.DishManagement.Converter
{
    public class DishConverter
    {
        /// <summary>
        /// Transforms entity object to Dto object
        /// </summary>
        /// <param name="item">Entity item to be transformed to api Dto</param>
        /// <returns>API Dto</returns>
        public static DishDtoResult EntityToApi(Dish item)
        {
            if (item == null) return null;

            return new DishDtoResult
            {
                dish = DishToApi(item),
                categories = GetDishCategories(item.DishCategory),
                extras = GetDishExtras(item.DishIngredient),
                image = GetImageDtoFromImage(item.IdImageNavigation)
            };
        }

        private static List<ExtraDto> GetDishExtras(ICollection<DishIngredient> itemDishIngredient)
        {
            var result = new List<ExtraDto>();

            if (itemDishIngredient == null) return result;

            try
            {
                foreach (var item in itemDishIngredient)
                {
                    result.Add(new ExtraDto
                    {
                        id = item.IdIngredient,
                        description = item.IdIngredientNavigation.Description,
                        price = item.IdIngredientNavigation.Price,
                        modificationCounter = item.ModificationCounter,
                        revision = 1,
                        name = item.IdIngredientNavigation.Name
                    });
                }
            }
            catch (Exception ex)
            {
                var msg = $"{ex.Message} : {ex.InnerException}";
            }

            return result;
        }

        private static List<CategoryDto> GetDishCategories(ICollection<DishCategory> itemDishCategory)
        {
            var result = new List<CategoryDto>();

            if (itemDishCategory == null) return result;

            try
            {
                foreach (var item in itemDishCategory)
                {
                    result.Add(new CategoryDto
                    {
                        id = item.IdCategory,
                        description = item.IdCategoryNavigation.Description,
                        modificationCounter = item.IdCategoryNavigation.ModificationCounter,
                        revision = 1,
                        name = item.IdCategoryNavigation.Name,
                        showOrder = item.IdCategoryNavigation.ShowOrder
                    });

                }
            }
            catch (Exception ex)
            {
                var msg = $"{ex.Message} : {ex.InnerException}";
            }

            return result;
        }

        private static DishDto DishToApi(Dish item)
        {
            return new DishDto
            {
                id = item.Id,
                description = item.Description,
                name = item.Name,
                price = item.Price,
                imageId = item.IdImage,
                modificationCounter = 0
            };
        }

        private static ImageDto GetImageDtoFromImage(Image image)
        {
            if (image == null) return new ImageDto();
            var result = new ImageDto();

            try
            {
                result = new ImageDto
                {
                    content = image.Content,
                    modificationCounter = image.ModificationCounter,
                    mimeType = image.MimeType,
                    name = image.Name,
                    id = image.Id,
                    contentType = image.ContentType == 0 ? "Binary" : "Url",
                    revision = 1
                };
            }
            catch (Exception ex)
            {
                var msg = $"{ex.Message} : {ex.InnerException}";
            }


            return result;
        }
    }
}
