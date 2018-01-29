using System.Collections.Generic;

namespace OASP4Net.Domain.Entities.Models
{
    public partial class Table
    {
        public Table()
        {
            Booking = new HashSet<Booking>();
        }

        public long Id { get; set; }
        public int SeatsNumber { get; set; }

        public ICollection<Booking> Booking { get; set; }
    }
}
