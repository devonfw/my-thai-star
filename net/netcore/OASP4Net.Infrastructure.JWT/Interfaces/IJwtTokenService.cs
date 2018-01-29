namespace OASP4Net.Infrastructure.JWT.Interfaces
{
    public interface IJwtTokenService
    {
        string GenerateToken(string userName, string userScope);
    }
}