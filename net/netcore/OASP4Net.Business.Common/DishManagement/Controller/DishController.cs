using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OASP4Net.Business.Common.DishManagement.Converter;
using OASP4Net.Business.Common.DishManagement.Dto;
using OASP4Net.Business.Common.DishManagement.Service;
using OASP4Net.Business.Common.General.Dto;

namespace OASP4Net.Business.Common.DishManagement.Controller
{
    /// <summary>
    /// DishController
    /// </summary>
    [EnableCors("CorsPolicy")]
    public class DishController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ILogger _logger;
        private readonly IDishService _dishService;

        public DishController(IDishService service, ILogger<DishController> logger)
        {
            _logger = logger;
            _dishService = service;
        }

        /// <summary>
        /// Gets the  list of available dishes regarding the filter options
        /// </summary>
        /// <param name="filterDto">Contains the criteria values to perform the search. Case of null or empty values will return the full set of dishes.</param>
        /// <returns></returns>
        /// <response code="200"> Ok. The search process has beencompleted with no error.</response>
        /// <response code="401">Unathorized. Autentication fail</response>  
        /// <response code="403">Forbidden. Authorization error.</response>    
        /// <response code="500">Internal Server Error. The search process ended with error.</response>       
        [HttpPost]
        [HttpOptions]
        [AllowAnonymous]
        [Route("/mythaistar/services/rest/Dishmanagement/v1/Dish/Search")]
        [EnableCors("CorsPolicy")]
        public async Task<IActionResult> Search([FromBody] FilterDtoSearchObject filterDto)
        {
            if (filterDto == null) filterDto = new FilterDtoSearchObject { MaxPrice = "0", MinLikes = "0", SearchBy = string.Empty, sort = new SortByDto[0] };
            var categories = filterDto.Categories ?? new CategorySearchDto[0];
            var searchBy = filterDto.SearchBy ?? string.Empty;
            var result = new ResultObjectDto<DishDtoResult>
            {
                Pagination =
                {
                    Page = 1,
                    Size = 500,
                    Total = null
                }
            };

            try
            {
                decimal maxPrice = string.IsNullOrEmpty(filterDto.MaxPrice) ? 0 : Convert.ToDecimal(filterDto.MaxPrice);
                int minLikes = string.IsNullOrEmpty(filterDto.MinLikes) ? 0 : Convert.ToInt32(filterDto.MinLikes);

                var dishList = await  _dishService.GetDishListFromFilter(false, maxPrice, Convert.ToInt32(minLikes), searchBy, categories.Select(c => c.Id).ToList(), -1);
                result.Result =   dishList.Select(DishConverter.EntityToApi).ToList();
                result.Pagination.Total = dishList.Count();
                var serializerSettings = new JsonSerializerSettings
                {
                    Formatting = Formatting.None
                };
                Response.Headers.Add("Access-Control-Expose-Headers", "Authorization");
                Response.Headers.Add("X-Content-Type-Options", "nosniff");
                Response.Headers.Add("X-Frame-Options", "DENY");
                Response.Headers.Add("X-XSS-Protection", "1;mode=block");
                Response.Headers.Add("X-Application-Context", "restaurant:h2mem:8081");
                var json = JsonConvert.SerializeObject(result, serializerSettings);
                return new OkObjectResult(json);
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, $"{ex.Message} : {ex.InnerException}");
            }

        }
    }
}
