using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using OASP4Net.Domain.Entities;
using OASP4Net.Domain.Entities.Models;
using OASP4Net.Domain.UnitOfWork.Service;
using OASP4Net.Domain.UnitOfWork.UnitOfWork;

namespace OASP4Net.Business.Common.DishManagement.Service
{
    public class DishService: Service<ModelContext>, IDishService
    {
        public DishService(IUnitOfWork<ModelContext> unitOfWork, IMapper mapper) : base(unitOfWork)
        {
        }
        public async Task<List<Dish>> GetDishListFromFilter(bool isFav, decimal maxPrice, int minLikes, string searchBy, IList<long> categoryIdList, long userId)
        {
            var includeList = new List<string>
            {
                "DishCategory","DishCategory.IdCategoryNavigation", "DishIngredient","DishIngredient.IdIngredientNavigation","IdImageNavigation"
            };

            var result = await UoW.Repository<Dish>().GetAllIncludeAsync(includeList);

            if (isFav && userId >= 0)
            {
                //var dishes =  result;
                if (result != null)
                {
                    var favourites = result.SelectMany(f => f.UserFavourite).Select(f => f.Id).ToList();                    
                    if (favourites.Any()) result = result.Where(r => favourites.Contains(r.Id)).ToList();
                }
            }

            if (categoryIdList.Any())
            { 
                result = result.Where(r => r.DishCategory.Any(a => categoryIdList.Contains(a.IdCategory))).ToList();
            }

            if (!string.IsNullOrEmpty(searchBy))
            {
                var criteria = searchBy.ToLower();
                result = result.Where(d => d.Name.ToLower().Contains(criteria) || d.Description.ToLower().Contains(criteria)).ToList();
            }

            //todo twitter
            if (minLikes > 0)
            {

            }

            if (maxPrice > 0)
            {
                result = result.Where(r => r.Price <= maxPrice).ToList();
            }

            var c = result.ToList();
            //PopulateDishReferences(ref c);

            return result.ToList();

        }
    }
}
