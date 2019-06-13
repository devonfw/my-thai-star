using System.Collections.Generic;

namespace OASP4Net.Domain.Entities.Models
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
        public int? ContentType { get; set; }
        public int? ModificationCounter { get; set; }

        public ICollection<Dish> Dish { get; set; }
    }
}
