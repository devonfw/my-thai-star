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
    public class OrderLineRepository : Repository<OrderLine>, IOrderLineRepository
    {
        private readonly IRepository<Dish> _dishRepository;        
        private readonly IRepository<OrderDishExtraIngredient> _orderDishExtraIngredientRepository;
        private readonly IRepository<Ingredient> _ingredientRepository;

        public OrderLineRepository(ModelContext context, IRepository<Dish> dishRepository, IRepository<OrderDishExtraIngredient> orderDishExtraIngredientRepository, IRepository<Ingredient> ingredientRepository) : base(context)
        {
            _dishRepository = dishRepository;
            _orderDishExtraIngredientRepository = orderDishExtraIngredientRepository;
            _ingredientRepository = ingredientRepository;
        }

        public override IEnumerable<OrderLine> GetAll(Expression<Func<OrderLine, bool>> predicate = null)
        {
            var result = base.GetAll(predicate);

            var orderLines = result as IList<OrderLine> ?? result.ToList();
            foreach (var item in orderLines.ToList())
            {                
                item.IdDishNavigation = _dishRepository.Get(d => d.Id == item.IdDish);
                item.OrderDishExtraIngredient = _orderDishExtraIngredientRepository.GetAll(e => e.IdOrderLine == item.Id).ToList();

                foreach (var ingredient in item.OrderDishExtraIngredient)
                {
                    ingredient.IdIngredientNavigation = _ingredientRepository.Get(i => i.Id == ingredient.Id);
                }
            }

            return orderLines;
        }
    }
}
