namespace OASP4Net.Infrastructure.JWT
{
    public class JwtConst
    {
        public const string Issuer = "MyThaiStarApp";
        public const int ExpirationHours = 1;
        public const string Secret = "ThisIsASecretKey!";
        public const string TokenPrefix = "Bearer";
        public const string HeaderString = "Authorization";
        public const string ExposeHeaders = "Access-Control-Expose-Headers";
        public const string ClaimSubject = "sub";
        public const string ClaimIssuer = "iss";
        public const string ClaimExpiration = "exp";
        public const string ClaimCreated = "iat";
        public const string ClaimScope = "scope";
        public const string SchemaIdentifier = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    }
}