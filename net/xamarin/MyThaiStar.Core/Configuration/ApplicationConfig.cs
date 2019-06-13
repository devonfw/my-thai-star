namespace MyThaiStar.Core.Configuration
{
    public static class ApplicationConfig
    {
        //setup dev environment        
        private const string BaseUrl = "http://10.0.2.2:8081/";

        public static string LoginUrl = $"{BaseUrl}mythaistar/login";
        public static string CurrentUserUrl = $"{BaseUrl}mythaistar/services/rest/security/v1/currentuser";

        #region DishManagement url
        public static string DishSearchUrl = $"{BaseUrl}mythaistar/services/rest/dishmanagement/v1/dish/search";
        #endregion
    }
}
