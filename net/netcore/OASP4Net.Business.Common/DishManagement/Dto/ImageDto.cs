namespace OASP4Net.Business.Common.DishManagement.Dto
{
    public class ImageDto
    {
        public long id { get; set; }
        public int? modificationCounter { get; set; }
        public object revision { get; set; }
        public string name { get; set; }
        public string content { get; set; }
        public string contentType { get; set; }
        public string mimeType { get; set; }
    }
}