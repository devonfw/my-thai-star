using System;
using Newtonsoft.Json;

namespace OASP4Net.Business.Common.BookingManagement.Dto
{
    public class BookingDto
    {
        [JsonProperty(PropertyName = "booking")]
        public BookingDtoValues Booking { get; set; }

        [JsonProperty(PropertyName = "invitedGuests")]
        public Invitedguest[] InvitedGuests { get; set; }
    }

    public class BookingDtoValues
    {
        [JsonProperty(PropertyName = "bookingDate")]
        public DateTime BookingDate { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }

        [JsonProperty(PropertyName = "bookingType")]
        public int BookingType { get; set; }

        [JsonProperty(PropertyName = "assistants")]
        public int Assistants { get; set; }
    }

    public class Invitedguest
    {
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }
    }
}
