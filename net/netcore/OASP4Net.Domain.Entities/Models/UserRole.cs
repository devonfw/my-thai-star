using System.Collections.Generic;

namespace OASP4Net.Domain.Entities.Models
{
    public partial class UserRole
    {
        public UserRole()
        {
            User = new HashSet<User>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public bool? Active { get; set; }

        public ICollection<User> User { get; set; }
    }
}
