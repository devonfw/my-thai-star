using System.Collections.Generic;
using OASP4Net.Business.Common.Source.Enums;
using OASP4Net.Domain.UnitOfWork.Repository;
using OASP4Net.Domain.Entities.Models;

namespace Oasp4net.DataAccess.Repositories.Interfaces
{
    public interface IBookingRepository : IRepository<Booking>
    {
        OrderTypeEnum GetType(string bookingToken);
        Booking GetBooking(string bookingToken);
        List<Booking> GetBookingList(string bookingToken);
    }
}
