using System;
using Newtonsoft.Json;
using OASP4Net.Business.Common.BookingManagement.Dto;
using OASP4Net.Domain.Entities.Models;

namespace OASP4Net.Business.Common.BookingManagement.Converter
{
    public class BookingConverter
    {
        public static BookingSearchResponseDto EntityToApi(Booking item)
        {
            if (item == null) return new BookingSearchResponseDto();

            return new BookingSearchResponseDto
            {
                id = item.Id,
                bookingToken = item.ReservationToken,
                revision = null,
                modificationCounter = 0,
                name = item.Name,
                email = item.Email,
                assistants = item.Assistants,
                bookingDate = JsonConvert.SerializeObject(ConvertDateTimeToMilliseconds(item.BookingDate)),
                bookingType = item.IdBookingType == 0 ? "COMMON" : "INVITED",
                canceled = item.Canceled ?? false,
                comment = item.Comments,
                creationDate = JsonConvert.SerializeObject(item.CreationDate),
                expirationDate = item.ExpirationDate != null
                    ? JsonConvert.SerializeObject(item.ExpirationDate)
                    : string.Empty,
                userId = item.UserId
            };

        }

        public static BookingSearchResponseDto EntityToApiFullResponse(Booking item)
        {
            if (item == null) return new BookingSearchResponseDto();

            try
            {
                return new BookingSearchResponseDto
                {
                    id = item.Id,
                    bookingToken = item.ReservationToken,
                    revision = null,
                    modificationCounter = 0,
                    name = item.Name,
                    email = item.Email,
                    assistants = item.Assistants,
                    bookingDate = JsonConvert.SerializeObject(ConvertDateTimeToMilliseconds(item.BookingDate)),
                    bookingType = item.IdBookingType == 0 ? "COMMON" : "INVITED",
                    canceled = item.Canceled ?? false,
                    comment = item.Comments,
                    creationDate = JsonConvert.SerializeObject(item.CreationDate),
                    expirationDate = item.ExpirationDate != null
                        ? JsonConvert.SerializeObject(item.ExpirationDate)
                        : string.Empty,
                    userId = item.UserId
                };
            }
            catch (Exception ex)
            {
                var msg = $"{ex.Message} : {ex.InnerException}";
            }
            return new BookingSearchResponseDto();

        }

        private static double ConvertDateTimeToMilliseconds(DateTime dateTime)
        {
            return dateTime.ToUniversalTime().Subtract(
                new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            ).TotalMilliseconds;
        }
    }
}
