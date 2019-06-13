using Newtonsoft.Json;
using OASP4Net.Business.Common.BookingManagement.Dto;
using OASP4Net.Domain.Entities.Models;

namespace OASP4Net.Business.Common.General.Converter
{
    public class InvitedGuestConverter
    {
        public static InvitedguestSearchDto EntityToApi(InvitedGuest item)
        {
            if (item == null) return new InvitedguestSearchDto();

            return new InvitedguestSearchDto
            {
                id = item.Id,
                revision = null,
                modificationCounter = 0,
                email = item.Email,
                accepted = item.Accepted ?? false,
                guestToken = item.GuestToken,
                bookingId = item.IdBooking,
                modificationDate = JsonConvert.SerializeObject(item.ModificationDate)
            };

        }

        public static InvitedguestSearchDto EntityToApiFullResponse(InvitedGuest item)
        {
            if (item == null) return new InvitedguestSearchDto();

            return new InvitedguestSearchDto
            {
                id = item.Id,
                revision = null,
                modificationCounter = 0,
                email = item.Email,
                accepted = item.Accepted ?? false,
                guestToken = item.GuestToken,
                bookingId = item.IdBooking,
                modificationDate = JsonConvert.SerializeObject(item.ModificationDate)
            };

        }

    }
}