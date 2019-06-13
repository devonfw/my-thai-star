using System.Collections.Generic;

namespace OASP4Net.Business.Common.OrderManagement.Dto
{
    public class OrderDto
    {
        public OrderDtoBooking booking { get; set; }
        public List<OrderlineDto> orderLines { get; set; }
    }

    public class OrderDtoBooking
    {
        public string bookingToken { get; set; }
    }

    public class OrderlineDto
    {
        public OrderlineDtoDetail orderLine { get; set; }
        public Extra[] extras { get; set; }
    }

    public class OrderlineDtoDetail
    {
        public int dishId { get; set; }
        public int amount { get; set; }
        public string comment { get; set; }
    }

    public class Extra
    {
        public string description { get; set; }
        public long id { get; set; }
        public int? modificationCounter { get; set; }
        public string name { get; set; }

        public decimal? price { get; set; }
        public int? revision { get; set; }
    }



    public class OrderDtoResponse
    {
        public int? id { get; set; }
        public int? modificationCounter { get; set; }
        public int? revision { get; set; }
        public long? bookingId { get; set; }
        public long? invitedGuestId { get; set; }
        public string bookingToken { get; set; }
        public long? hostId { get; set; }
    }


}
