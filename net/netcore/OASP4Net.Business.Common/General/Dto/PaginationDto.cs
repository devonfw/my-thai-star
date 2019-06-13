using Newtonsoft.Json;

namespace OASP4Net.Business.Common.General.Dto
{
    public class Pagination
    {
        [JsonProperty(PropertyName = "size")]
        public int Size { get; set; }
        [JsonProperty(PropertyName = "page")]
        public int Page { get; set; }
        [JsonProperty(PropertyName = "total")]
        public object Total { get; set; }
    }
}