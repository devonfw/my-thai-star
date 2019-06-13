using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class UserRole
    {
        public UserRole()
        {
            User = new HashSet<User>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Active { get; set; }

        public ICollection<User> User { get; set; }
    }
}
