using System.Collections.Generic;
using Newtonsoft.Json;

namespace OASP4Net.Business.Common.DishManagement.Dto
{
    public class DishDtoResult
    {                			
        [JsonProperty(PropertyName = "dish")]
        public DishDto dish { get; set; }

        [JsonProperty(PropertyName = "image")]
        public ImageDto image { get; set; }

        [JsonProperty(PropertyName = "test")]
        public int? test { get; set; }

        /// <summary>
        /// Association from DishDtoResult [simple] to ExtraDto [many]
        /// </summary>
        [JsonProperty(PropertyName = "extras")]
        public ICollection<ExtraDto> extras { get; set; }

        /// <summary>
        /// Association from DishDtoResult [simple] to CategoryDto [many]
        /// </summary>
        [JsonProperty(PropertyName = "categories")]
        public ICollection<CategoryDto> categories { get; set; }



        public	DishDtoResult()
        {
            extras = new HashSet<ExtraDto>();
            categories = new HashSet<CategoryDto>();
            
        }
    }
}

