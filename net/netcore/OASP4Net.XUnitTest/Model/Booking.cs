using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class Booking
    {
        public Booking()
        {
            InvitedGuest = new HashSet<InvitedGuest>();
            Order = new HashSet<Order>();
        }

        public long Id { get; set; }
        public long? UserId { get; set; }
        public string Name { get; set; }
        public string ReservationToken { get; set; }
        public string Comments { get; set; }
        public string BookingDate { get; set; }
        public string ExpirationDate { get; set; }
        public string CreationDate { get; set; }
        public string Canceled { get; set; }
        public long? IdBookingType { get; set; }
        public long? TableId { get; set; }
        public string Email { get; set; }
        public long? Assistants { get; set; }

        public Table Table { get; set; }
        public User User { get; set; }
        public ICollection<InvitedGuest> InvitedGuest { get; set; }
        public ICollection<Order> Order { get; set; }
    }
}
