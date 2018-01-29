using System.Collections.Generic;
using OASP4Net.Business.Common.BookingManagement.Dto;

namespace OASP4Net.Business.Common.OrderManagement.Dto
{

    public class OrderSearchFullResponseDto
    {
        public OrderFullResponse order { get; set; }
        public BookingSearchResponseDto booking { get; set; }
        public InvitedguestFullResponse invitedGuest { get; set; }
        public List<OrderlineFullResponse> orderLines { get; set; }
        public HostFullResponse host { get; set; }
    }

    public class OrderFullResponse
    {
        public long id { get; set; }
        public int modificationCounter { get; set; }
        public object revision { get; set; }
        public long bookingId { get; set; }
        public long? invitedGuestId { get; set; }
        public object bookingToken { get; set; }
        public int? hostId { get; set; }
    }

    public class BookingFullResponse
    {
        public int id { get; set; }
        public int modificationCounter { get; set; }
        public object revision { get; set; }
        public string name { get; set; }
        public string bookingToken { get; set; }
        public string comment { get; set; }
        public long bookingDate { get; set; }
        public long expirationDate { get; set; }
        public long creationDate { get; set; }
        public string email { get; set; }
        public bool canceled { get; set; }
        public string bookingType { get; set; }
        public int tableId { get; set; }
        public int? orderId { get; set; }
        public int? assistants { get; set; }
        public int userId { get; set; }
    }

    public class InvitedguestFullResponse
    {
        public long id { get; set; }
        public int modificationCounter { get; set; }
        public object revision { get; set; }
        public long bookingId { get; set; }
        public string guestToken { get; set; }
        public string email { get; set; }
        public bool accepted { get; set; }
        public string modificationDate { get; set; }
    }

    public class HostFullResponse
    {
        public int id { get; set; }
        public int modificationCounter { get; set; }
        public object revision { get; set; }
        public string name { get; set; }
        public string bookingToken { get; set; }
        public string comment { get; set; }
        public long bookingDate { get; set; }
        public long expirationDate { get; set; }
        public long creationDate { get; set; }
        public string email { get; set; }
        public bool canceled { get; set; }
        public string bookingType { get; set; }
        public int tableId { get; set; }
        public int orderId { get; set; }
        public int assistants { get; set; }
        public int userId { get; set; }
    }

    public class OrderlineFullResponse
    {
        public OrderlineDetailFullResponse orderLine { get; set; }
        public object order { get; set; }
        public DishFullResponse dish { get; set; }
        public List<Extra> extras { get; set; }
    }

    public class OrderlineDetailFullResponse
    {
        public long id { get; set; }
        public int modificationCounter { get; set; }
        public object revision { get; set; }
        public long orderId { get; set; }
        public long dishId { get; set; }
        public int amount { get; set; }
        public string comment { get; set; }
    }

    public class DishFullResponse
    {
        public long id { get; set; }
        public int modificationCounter { get; set; }
        public object revision { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public decimal price { get; set; }
        public int imageId { get; set; }
    }

    public class ExtraFullResponse
    {
        public int id { get; set; }
        public int modificationCounter { get; set; }
        public object revision { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public float price { get; set; }
    }

}
