using OASP4Net.Business.Common.General.Dto;

namespace OASP4Net.Business.Common.BookingManagement.Dto
{
    public class BookingSearchDto
    {
        public string email { get; set; }
        public string bookingToken { get; set; }
        public Pagination pagination { get; set; }
        public object[] sort { get; set; }
    }    

}