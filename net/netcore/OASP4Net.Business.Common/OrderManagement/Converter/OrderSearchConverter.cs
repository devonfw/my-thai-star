using OASP4Net.Business.Common.BookingManagement.Dto;
using OASP4Net.Domain.Entities.Models;

namespace OASP4Net.Business.Common.OrderManagement.Converter
{
    public class OrderSearchConverter
    {
        public static OrderSearchDto EntityToApi(Order item)
        {
            if (item == null) return new OrderSearchDto();

            return new OrderSearchDto
            {
                id = item.Id,
                revision = null,
                modificationCounter = 0,
                bookingToken = item.IdReservationNavigation.ReservationToken,
                bookingId = item.IdReservationNavigation.Id,
                hostId = null,
                invitedGuestId = item.IdInvitationGuest
            };

        }

    }
}