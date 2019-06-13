using System;
using System.Security.Cryptography;
using System.Text;

namespace OASP4Net.Infrastructure.Common.Extensions
{
    public static class Md5Extension
    {
        public static string Md5Encode(this string chain)
        {
            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(chain));
                return BitConverter.ToString(hash);
            }
        }
    }
}
