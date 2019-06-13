using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class Table
    {
        public Table()
        {
            Booking = new HashSet<Booking>();
        }

        public long Id { get; set; }
        public long SeatsNumber { get; set; }

        public ICollection<Booking> Booking { get; set; }
    }
}
