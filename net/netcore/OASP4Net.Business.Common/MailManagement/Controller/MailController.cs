using System;
using System.Net;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using OASP4Net.Business.Common.BookingManagement.Controller;
using OASP4Net.Business.Common.BookingManagement.Service;

namespace OASP4Net.Business.Common.MailManagement.Controller
{
    /// <summary>
    /// 
    /// </summary>
    public class MailApiController : Microsoft.AspNetCore.Mvc.Controller
    {
        private IMapper Mapper { get; set; }
        private ILogger<BookingController> Logger { get; set; }
        private IBookingService BookingService { get; set; }

        /// <summary>
        /// Method to accept or decline an invitation updating the &#39;accepted&#39; field of the InvitedGuest entity.
        /// </summary>
        public MailApiController(IBookingService bookingService, IMapper mapper, ILogger<BookingController> logger)
        {
            BookingService = bookingService;
            Logger = logger;
            Mapper = mapper;
        }



        /// <param name="guestToken">Token generated in the reservation process where guests are invited.</param>
        /// <response code="204">Ok, no content. The search process has beencompleted with no error.</response>
        /// <response code="400">Bad request. The invitation cannot be cancelled because the request is 10 minutes before the event after being accepted before.</response>
        /// <response code="401">Unathorized. Autentication fail</response>
        /// <response code="403">Forbidden. Authorization error.</response>
        /// <response code="500">Internal Server Error. The search process ended with error.</response>
        [HttpGet]
        [Route("/mythaistar/services/rest/bookingmanagement/v1/invitedguest/accept/{guestToken}")]
        public virtual IActionResult MailBookingAcceptInvitation([FromRoute]string guestToken)
        {
            string exampleJson = null;

            var example = exampleJson != null
                ? JsonConvert.DeserializeObject<Object>(exampleJson)
                : default(Object);
            return new ObjectResult(example);
        }


        /// <summary>
        /// Method to cancel the invitation. Once is cancelled the system will send a cancelation email to all guests.  An invitation only can be canceled if the cancelation request is not send an hour before the booking
        /// </summary>
        /// <param name="bookingToken">Token generated in the booking process where guests are invited. Mandatory</param>
        /// <response code="204">Ok, no content. Invitation canceled</response>
        /// <response code="400">Bad Request. Incorrect Invitation token given or parse error.The invitation cannot be cancelled because the request is an hour before the event.</response>
        /// <response code="401">Unathorized. Autentication fail</response>
        /// <response code="403">Forbidden. Authorization error.</response>
        /// <response code="500">Internal Server Error. The search process ended with error.</response>
        [HttpGet]
        [Route("/mythaistar/services/rest/Bookingmanagement/v1/booking/cancel/{bookingToken}")]
        public async Task<IActionResult> MailBookingCancelInvitation([FromRoute] string bookingToken)
        {
            try
            {
                var result = await BookingService.CancelBooking(bookingToken) ? "Reservation canceled" : "Unable to cancel reservation";
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
        /// Method to delete the order. Once the order is deleted the system will send a cancelation email to all guests.
        /// </summary>

        /// <param name="id"></param>
        /// <response code="204">Ok, no content. Invitation canceled</response>
        /// <response code="400">Bad Request. Incorrect Invitation token given or parse error.</response>
        /// <response code="401">Unathorized. Autentication fail</response>
        /// <response code="403">Forbidden. Authorization error.</response>
        /// <response code="500">Internal Server Error. The search process ended with error.</response>
        [HttpGet]
        [Route("/mythaistar/services/rest/ordermanagement/v1/order/cancelorder/{id}")]
        
        public virtual IActionResult MailBookingCancelOrder([FromRoute]string id)
        {
            string exampleJson = null;

            var example = exampleJson != null
                ? JsonConvert.DeserializeObject<Object>(exampleJson)
                : default(Object);
            return new ObjectResult(example);
        }


        /// <summary>
        /// Method to accept or decline an invitation updating the &#39;accepted&#39; field of the InvitedGuest entity.
        /// </summary>

        /// <param name="guestToken">Token generated in the reservation process where guests are invited.</param>
        /// <response code="204">Ok, no content. The search process has beencompleted with no error.</response>
        /// <response code="400">Bad request. The invitation cannot be cancelled because the request is 10 minutes before the event after being accepted before.</response>
        /// <response code="401">Unathorized. Autentication fail</response>
        /// <response code="403">Forbidden. Authorization error.</response>
        /// <response code="500">Internal Server Error. The search process ended with error.</response>
        [HttpGet]
        [Route("/mythaistar/services/rest/bookingmanagement/v1/invitedguest/decline/{guestToken}")]
        public virtual IActionResult MailBookingDeclineInvitation([FromRoute]string guestToken)
        {
            string exampleJson = null;

            var example = exampleJson != null
                ? JsonConvert.DeserializeObject<Object>(exampleJson)
                : default(Object);
            return new ObjectResult(example);
        }
    }
}