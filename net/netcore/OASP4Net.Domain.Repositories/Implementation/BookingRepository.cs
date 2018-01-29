using System.Collections.Generic;
using System.Linq;
using Oasp4net.DataAccess.Repositories.Interfaces;
using OASP4Net.Domain.Entities.Models;
using OASP4Net.Business.Common.Source.Enums;
using OASP4Net.Domain.Entities;
using OASP4Net.Domain.UnitOfWork.Repository;

namespace Oasp4net.DataAccess.Repositories.Implementation
{
    public class BookingRepository : Repository<Booking>, IBookingRepository
    {
        private readonly IRepository<InvitedGuest> _invitedGuestRepository;

        public BookingRepository(ModelContext context, IRepository<InvitedGuest> invitedGuestRepository) : base(context)
        {
            _invitedGuestRepository = invitedGuestRepository;
        }

        public Booking GetBooking(string bookingToken)
        {
            Booking result = null;
            var bookingtype = GetType(bookingToken);
            switch (bookingtype)
            {
                case OrderTypeEnum.CommonBooking:
                    result = Get(b => b.ReservationToken == bookingToken);
                    break;
                case OrderTypeEnum.GuestBooking:

                    var idBooking = _invitedGuestRepository.Get(i => i.GuestToken == bookingToken);
                    result = Get(b => b.Id == idBooking.Id);
                    break;

            }

            return result;
        }

        public List<Booking> GetBookingList(string bookingToken)
        {
            List<Booking> result = new List<Booking>();
            var bookingtype = GetType(bookingToken);
            switch (bookingtype)
            {
                case OrderTypeEnum.CommonBooking:
                    result = GetAll(b => b.ReservationToken == bookingToken).ToList();
                    break;
                case OrderTypeEnum.GuestBooking:
                    var idBookingList = _invitedGuestRepository.GetAll(i => i.GuestToken == bookingToken);
                    result.AddRange(idBookingList.Select(idBooking => Get(b => b.Id == idBooking.IdBooking)));
                    break;
            }

            return result;
        }

        public OrderTypeEnum GetType(string bookingToken)
        {
            return  bookingToken.StartsWith("CB") ? OrderTypeEnum.CommonBooking : OrderTypeEnum.GuestBooking;
        }

    }
}
