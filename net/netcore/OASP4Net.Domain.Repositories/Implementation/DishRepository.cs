using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Oasp4net.DataAccess.Repositories.Interfaces;
using Oasp4net.DataAccessLayer;
using Oasp4net.DataAccessLayer.Common.Implementation;
using Oasp4net.DataAccessLayer.Common.Interfaces;
using Oasp4net.DataAccessLayer.Models;

namespace Oasp4net.DataAccess.Repositories.Implementation
{
    public class DishRepository : Repository<Dish>, IDishRepository
    {
        private readonly IRepository<DishCategory> _dishCategoryRepository;
        private readonly IRepository<DishIngredient> _dishIngredientRepository;

        public DishRepository(ModelContext context, 
            IRepository<DishCategory> dishCategoryRepository,
            IRepository<DishIngredient> dishIngredientRepository) : base(context)
        {
            _dishCategoryRepository = dishCategoryRepository;
            _dishIngredientRepository = dishIngredientRepository;
        }

        public override IEnumerable<Dish> GetAll(Expression<Func<Dish, bool>> predicate = null)
        {
            var result = base.GetAll(predicate);

            foreach (var dish in result)
            {
                dish.DishCategory = _dishCategoryRepository.GetAll(c=>c.IdDish == dish.Id).ToList();
                dish.DishIngredient = _dishIngredientRepository.GetAll(c => c.IdDish == dish.Id).ToList();
            }


            return result;
        }
    }
}
