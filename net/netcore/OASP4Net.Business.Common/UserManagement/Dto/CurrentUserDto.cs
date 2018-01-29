using Newtonsoft.Json;

namespace OASP4Net.Business.Common.UserManagement.Dto
{
    public class CurrentUserDto
    {
        [JsonProperty(PropertyName = "id")]
        public object Id { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonProperty(PropertyName = "firstName")]
        public object FirstName { get; set; }

        [JsonProperty(PropertyName = "lastName")]
        public object LastName { get; set; }

        [JsonProperty(PropertyName = "role")]
        public string Role { get; set; }

        public CurrentUserDto()
        {
            Id = string.Empty;
            Name = string.Empty;
            FirstName = string.Empty;
            LastName = string.Empty;
            Role = string.Empty;
        }
    }


}
