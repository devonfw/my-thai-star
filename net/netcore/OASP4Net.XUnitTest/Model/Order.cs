using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class Order
    {
        public Order()
        {
            OrderLine = new HashSet<OrderLine>();
        }

        public long Id { get; set; }
        public long? IdReservation { get; set; }
        public long? IdInvitationGuest { get; set; }

        public InvitedGuest IdInvitationGuestNavigation { get; set; }
        public Booking IdReservationNavigation { get; set; }
        public ICollection<OrderLine> OrderLine { get; set; }
    }
}
