using System.Collections.Generic;

namespace OASP4Net.Domain.Entities.Models
{
    public partial class User
    {
        public User()
        {
            Booking = new HashSet<Booking>();
            UserFavourite = new HashSet<UserFavourite>();
        }

        public long Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public long IdRole { get; set; }

        public UserRole IdRoleNavigation { get; set; }
        public ICollection<Booking> Booking { get; set; }
        public ICollection<UserFavourite> UserFavourite { get; set; }
    }
}
