namespace OASP4Net.Business.Common.UserManagement.Service
{
    public interface ILoginService
    {
        bool Login(string userName, string password);
        string GetUserScope(string userName);
    }
}