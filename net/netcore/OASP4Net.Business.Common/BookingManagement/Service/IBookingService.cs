using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using OASP4Net.Business.Common.BookingManagement.Dto;
using OASP4Net.Business.Common.MailManagement.Dto;
using OASP4Net.Business.Common.OrderManagement.Dto;

namespace OASP4Net.Business.Common.BookingManagement.Service
{
    public interface IBookingService
    {
        Task<List<BookingSearchResponse>> GetBookingSearch(string bookingToken, string email);
        Task<List<OrderSearchFullResponseDto>> GetBookinSearchFullResponse(string bookingToken, string email);
        Task<BookingResponseDto> CreateReservationAndGuestList(int bookingDtoType, string reservationDtoName, int reservationDtoAssistants, IList<string> reservationDtoGuestList, string reservationDtoEmail, DateTime reservationDtoDate, long? userId);
        EmailResponseDto AcceptOrRejectInvitationGuest(string bookingToken, bool accepted);
        Task<bool> CancelBooking(string token);
    }
}