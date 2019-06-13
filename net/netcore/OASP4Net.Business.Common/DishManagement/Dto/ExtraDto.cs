namespace OASP4Net.Business.Common.DishManagement.Dto
{
    public class ExtraDto
    {
        public long id { get; set; }
        public int? modificationCounter { get; set; }
        public int revision { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public decimal? price { get; set; }
    }
}