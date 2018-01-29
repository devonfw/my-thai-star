using System;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OASP4Net.Business.Common.BookingManagement.Dto;
using OASP4Net.Business.Common.BookingManagement.Service;
using OASP4Net.Business.Common.General.Dto;
using OASP4Net.Business.Common.OrderManagement.Dto;
using OASP4Net.Business.Common.OrderManagement.Service;

namespace OASP4Net.Business.Common.OrderManagement.Controller
{
    [EnableCors("CorsPolicy")]
    public class OrderController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ILogger _logger;
        private IOrderService _orderService;
        private readonly IBookingService _bookingService;

        public OrderController(IOrderService orderService, IBookingService bookingService, ILogger<OrderController> logger)
        {
            _orderService = orderService;
            _bookingService = bookingService;
            _logger = logger;
        }

        /// <summary>
        /// Gets the  list of available orders regarding the filter options
        /// </summary>
        /// <param name="orderFilterDto">Contains the filter values to perform the search. Case of null or empty values will return the full set of orders.</param>
        /// <response code="200">Ok. The search process has beencompleted with no error.</response>
        /// <response code="401">Unathorized. Autentication fail</response>
        /// <response code="403">Forbidden. Authorization error.</response>
        /// <response code="500">Internal Server Error. The search process ended with error.</response>
        [HttpPost]
        [HttpPost]
        [HttpOptions]
        [AllowAnonymous]
        [Route("/mythaistar/services/rest/Ordermanagement/v1/order/filter")]
        [EnableCors("CorsPolicy")]
        public virtual async Task<IActionResult> OrderFilter([FromBody] BookingSearchDto orderFilterDto)
        {
            try
            {
                var result = new ResultObjectDto<BookingSearchResponse>
                {
                    Pagination =
                    {
                        Page = 1,
                        Size = 500,
                        Total = null
                    },
                    Result = await _bookingService.GetBookingSearch(orderFilterDto.bookingToken, orderFilterDto.email)
                };

                result.Pagination.Total = result.Result?.Count ?? 0;

                var serializerSettings = new JsonSerializerSettings
                {
                    Formatting = Formatting.None
                };

                Response.Headers.Add("X-Content-Type-Options", "nosniff");
                Response.Headers.Add("X-Frame-Options", "DENY");
                Response.Headers.Add("X-XSS-Protection", "1;mode=block");
                var json = JsonConvert.SerializeObject(result, serializerSettings);
                return new OkObjectResult(json);
            }
            catch (Exception ex)
            {
                var content = StatusCode((int)HttpStatusCode.BadRequest, $"{ex.Message} : {ex.InnerException}");
                return Content(JsonConvert.SerializeObject(content), "application/json");
            }
        }


        /// <summary>
        /// Order the order. Given an order Dto, the server side will prepare the different order lines.
        /// </summary>

        /// <param name="orderDto">The model of the ordert to be processed on the server side. The InvitationToken field is mandatory.</param>
        /// <response code="201">Ok. Created. Returns the created order reference</response>
        /// <response code="400">Bad Request. No Invitation token given.</response>
        /// <response code="401">Unathorized. Autentication fail</response>
        /// <response code="403">Forbidden. Authorization error.</response>
        /// <response code="500">Internal Server Error. The search process ended with error.</response>

        [HttpPost]
        [HttpPost]
        [HttpOptions]
        [AllowAnonymous]
        [Route("/mythaistar/services/rest/ordermanagement/v1/order")]
        [EnableCors("CorsPolicy")]
        public virtual IActionResult OrderOrder([FromBody]OrderDto orderDto)
        {
            try
            {
                _orderService.OrderTheOrder(orderDto.booking.bookingToken, orderDto.orderLines);
                return Ok();
            }
            catch (Exception ex)
            {
                var content = StatusCode((int)HttpStatusCode.InternalServerError, $"{ex.Message} : {ex.InnerException}");
                return Content(JsonConvert.SerializeObject(content), "application/json");
            }
        }


        /// <summary>
        /// Gets the  list of available orders regarding the search criteria options
        /// </summary>
        /// <param name="orderSearchCriteriaDto">Contains the criteria values to perform the search. Case of null or empty values will return the full set of orders.</param>
        /// <response code="200">Ok. The search process has beencompleted with no error.</response>
        /// <response code="401">Unathorized. Autentication fail</response>
        /// <response code="403">Forbidden. Authorization error.</response>
        /// <response code="500">Internal Server Error. The search process ended with error.</response>
        [HttpPost]
        [HttpOptions]
        [Route("/mythaistar/services/rest/Ordermanagement/v1/order/search")]
        [AllowAnonymous]
        [EnableCors("CorsPolicy")]
        //[Authorize(Policy = "MTSWaiterPolicy")]
        [Authorize]
        public virtual async Task<IActionResult> OrderSearch([FromBody] BookingSearchDto orderSearchCriteriaDto)
        {
            try
            {
                var result = new ResultObjectDto<OrderSearchFullResponseDto>
                {
                    Pagination =
                    {
                        Page = 1,
                        Size = 500,
                        Total = null
                    },
                    Result = await _bookingService.GetBookinSearchFullResponse(orderSearchCriteriaDto.bookingToken,
                        orderSearchCriteriaDto.email)
                };

                result.Pagination.Total = result.Result != null ? result.Result.Count : 0;

                var serializerSettings = new JsonSerializerSettings
                {
                    Formatting = Formatting.None
                };

                Response.Headers.Add("X-Content-Type-Options", "nosniff");
                Response.Headers.Add("X-Frame-Options", "DENY");
                Response.Headers.Add("X-XSS-Protection", "1;mode=block");
                var json = JsonConvert.SerializeObject(result, serializerSettings);
                return new OkObjectResult(json);
            }
            catch (Exception ex)
            {
                var content = StatusCode((int)HttpStatusCode.BadRequest, $"{ex.Message} : {ex.InnerException}");
                return Content(JsonConvert.SerializeObject(content), "application/json");
            }
        }
    }
}
