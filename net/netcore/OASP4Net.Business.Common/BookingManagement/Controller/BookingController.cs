using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OASP4Net.Business.Common.BookingManagement.Dto;
using OASP4Net.Business.Common.BookingManagement.Service;
using OASP4Net.Business.Common.General.Dto;

namespace OASP4Net.Business.Common.BookingManagement.Controller
{
    [EnableCors("CorsPolicy")]
    public class BookingController : Microsoft.AspNetCore.Mvc.Controller
    {
        private IMapper Mapper { get; set; }
        private IBookingService BookingService { get; set; }
        public BookingController(IBookingService bookingService, IMapper mapper)
        {
            BookingService = bookingService;
            Mapper = mapper;

        }

        /// <summary>
        /// Method to make a reservation with potentiel guests. The method returns the reservation token with the format: {(CB_|GB_)}{now.Year}{now.Month:00}{now.Day:00}{_}{MD5({Host/Guest-email}{now.Year}{now.Month:00}{now.Day:00}{now.Hour:00}{now.Minute:00}{now.Second:00})}
        /// </summary>

        /// <param name="bookingDto"></param>
        /// <response code="201">Ok.</response>
        /// <response code="400">Bad request. Parser data error.</response>
        /// <response code="401">Unathorized. Autentication fail</response>
        /// <response code="403">Forbidden. Authorization error.</response>
        /// <response code="500">Internal Server Error. The search process ended with error.</response>
        [HttpPost]
        [HttpOptions]
        [Route("/mythaistar/services/rest/bookingmanagement/v1/booking")]
        [AllowAnonymous]
        [EnableCors("CorsPolicy")]
        public async Task<IActionResult> BookingBooking([FromBody]BookingDto bookingDto)
        {
            try
            {
                var invitedGuest = bookingDto.InvitedGuests?.Select(i => i.Email).ToList() ?? new List<string>();
                var booking = await BookingService.CreateReservationAndGuestList(bookingDto.Booking.BookingType,
                    bookingDto.Booking.Name, bookingDto.Booking.Assistants, invitedGuest, bookingDto.Booking.Email,
                    bookingDto.Booking.BookingDate.ToLocalTime(), null);


                Console.WriteLine($"http://localhost:8081/mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/{booking.BookingToken}");
                Console.WriteLine($"http://localhost:8081/mythaistar/services/rest/bookingmanagement/v1/invitedguest/cancel/{booking.BookingToken}");
                Console.WriteLine($"http://localhost:8081/mythaistar/services/rest/Bookingmanagement/v1/booking/cancel/{booking.BookingToken}");
                Console.WriteLine($"http://localhost:8081/mythaistar/services/rest/Bookingmanagement/v1/booking/accept/{booking.BookingToken}");

                var serializerSettings = new JsonSerializerSettings
                {
                    Formatting = Formatting.None
                };
                Response.Headers.Add("X-Content-Type-Options", "nosniff");
                Response.Headers.Add("X-Frame-Options", "DENY");
                Response.Headers.Add("X-XSS-Protection", "1;mode=block");
                var json = JsonConvert.SerializeObject(booking, serializerSettings);
                return new OkObjectResult(json);
            }
            catch (Exception ex)
            {
                var content = StatusCode((int)HttpStatusCode.BadRequest, $"{ex.Message} : {ex.InnerException}");
                return Content(JsonConvert.SerializeObject(content), "application/json");
            }
        }


        /// <summary>
        /// Method to get reservations
        /// </summary>
        /// <response code="201">Ok.</response>
        /// <response code="400">Bad request. Parser data error.</response>
        /// <response code="401">Unathorized. Autentication fail</response>
        /// <response code="403">Forbidden. Authorization error.</response>
        /// <response code="500">Internal Server Error. The search process ended with error.</response>
        [HttpPost]
        [Route("/mythaistar/services/rest/bookingmanagement/v1/booking/search")]
        //[Authorize(Policy = "MTSWaiterPolicy")]
        [AllowAnonymous]
        [EnableCors("CorsPolicy")]
        public async Task<IActionResult> BookingSearch([FromBody]BookingSearchDto bookingSearchDto)
        {
            //var bookingRepository = new BookingRepository();

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
                    Result = await BookingService.GetBookingSearch(bookingSearchDto.bookingToken, bookingSearchDto.email)
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
