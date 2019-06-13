using System;
using System.Collections.Generic;

namespace OASP4Net.Domain.Entities.Models
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
        public DateTime BookingDate { get; set; }
        public DateTime? ExpirationDate { get; set; }
        public DateTime? CreationDate { get; set; }
        public bool? Canceled { get; set; }
        public int? IdBookingType { get; set; }
        public long? TableId { get; set; }
        public string Email { get; set; }
        public int? Assistants { get; set; }

        public Table Table { get; set; }
        public User User { get; set; }
        public ICollection<InvitedGuest> InvitedGuest { get; set; }
        public ICollection<Order> Order { get; set; }
    }
}
