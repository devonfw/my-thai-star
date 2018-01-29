using System;
using System.Collections.Generic;

namespace OASP4Net.Test.Model
{
    public partial class Image
    {
        public Image()
        {
            Dish = new HashSet<Dish>();
        }

        public long Id { get; set; }
        public string Content { get; set; }
        public string Name { get; set; }
        public string MimeType { get; set; }
        public string Extension { get; set; }
        public long? ContentType { get; set; }
        public long? ModificationCounter { get; set; }

        public ICollection<Dish> Dish { get; set; }
    }
}
