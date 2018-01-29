using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class InvitedGuest
    {
        public InvitedGuest()
        {
            Order = new HashSet<Order>();
        }

        public long Id { get; set; }
        public long IdBooking { get; set; }
        public string GuestToken { get; set; }
        public string Email { get; set; }
        public string Accepted { get; set; }
        public string ModificationDate { get; set; }

        public Booking IdBookingNavigation { get; set; }
        public ICollection<Order> Order { get; set; }
    }
}
