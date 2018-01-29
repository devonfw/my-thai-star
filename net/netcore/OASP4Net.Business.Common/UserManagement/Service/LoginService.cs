namespace OASP4Net.Business.Common.UserManagement.Service
{
    public class LoginService : ILoginService
    {
        public bool Login(string userName, string password)
        {
            var result = false;
            if (userName.ToLower() == "waiter" && password == "waiter") result = true;
            if (userName.ToLower() == "user0" && password == "password") result = true;

            return result;
        }

        public string GetUserScope(string userName)
        {
            switch (userName.ToLower())
            {
                case "waiter":
                    return "WAITER";
                case "user0":
                    return "CUSTOMER";
                default: return string.Empty;
            }
        }
    }
}
