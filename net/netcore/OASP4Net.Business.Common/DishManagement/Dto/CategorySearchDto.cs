using Newtonsoft.Json;

namespace OASP4Net.Business.Common.DishManagement.Dto
{
    public class CategorySearchDto
    {
        [JsonProperty(PropertyName = "id")]
        public long Id { get; set; }

    }
}
