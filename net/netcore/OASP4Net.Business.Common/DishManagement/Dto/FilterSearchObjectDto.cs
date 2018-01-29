using Newtonsoft.Json;
using OASP4Net.Business.Common.General.Dto;

namespace OASP4Net.Business.Common.DishManagement.Dto
{
    public class FilterDtoSearchObject
    {
        [JsonProperty(PropertyName = "categories")]
        public CategorySearchDto[] Categories { get; set; }

        [JsonProperty(PropertyName = "searchBy")]
        public string SearchBy { get; set; }

        [JsonProperty(PropertyName = "sort")]
        public SortByDto[] sort { get; set; }

        [JsonProperty(PropertyName = "maxPrice")]
        public string MaxPrice { get; set; }

        [JsonProperty(PropertyName = "minLikes")]
        public string MinLikes { get; set; }
    }
}
