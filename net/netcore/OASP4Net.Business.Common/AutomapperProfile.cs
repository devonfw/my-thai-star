using AutoMapper;
using OASP4Net.Business.Common.DishManagement.Dto;
using OASP4Net.Domain.Entities.Models;

namespace OASP4Net.Business.Common
{
    public class AutomapperProfile : Profile
    {
        public AutomapperProfile()
        {
            CreateMap<Dish, DishDto>();

        }

        
    }
}
