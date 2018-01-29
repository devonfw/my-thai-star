using System.Collections.Generic;
using System.Threading.Tasks;
using OASP4Net.Domain.Entities.Models;

namespace OASP4Net.Business.Common.DishManagement.Service
{
    public interface IDishService
    {
        Task<List<Dish>> GetDishListFromFilter(bool isFav, decimal maxPrice, int minLikes, string searchBy, IList<long> list, long userId);
    }
}