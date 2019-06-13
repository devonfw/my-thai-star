using Newtonsoft.Json;

namespace OASP4Net.Business.Common.General.Dto
{
    public class SortByDto
    {
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        /// <summary>
        ///  ASC for ascending and DESC for descending
        /// </summary>
        [JsonProperty(PropertyName = "direction")]
        public string Direction { get; set; } 
        
    }
}