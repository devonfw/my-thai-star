using System.Collections.Generic;
using Newtonsoft.Json;

namespace OASP4Net.Business.Common.General.Dto
{
    public class ResultObjectDto<T>
    {
        [JsonProperty(PropertyName = "pagination")]
        public Pagination Pagination { get; set; }
        [JsonProperty(PropertyName = "result")]
        public List<T> Result { get; set; }

        public ResultObjectDto()
        {
            Pagination = new Pagination();
            Result = new List<T>();
        }
    }
}