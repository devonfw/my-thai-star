using System;
using System.IO;
using System.Linq;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.PlatformAbstractions;
using OASP4Net.Test.Model;

namespace OASP4Net.XUnitTest
{
    public class BaseManagementTest : IDisposable
    {
        protected MyThaiStar Context { get; set; }

        protected BaseManagementTest()
        {
            var conn = $"DataSource={GetDatabasePath()}";
            var connection = new SqliteConnection(conn);

            var builder = new DbContextOptionsBuilder<MyThaiStar>();
            builder.UseSqlite(connection);
            var options = builder.Options;
            Context = new MyThaiStar(options);
        }
        private string GetDatabasePath()
        {
            var basePath = PlatformServices.Default.Application.ApplicationBasePath;
            return Directory.GetFiles(basePath, "MyThaiStar.db", SearchOption.AllDirectories).ToList().FirstOrDefault();
        }

        public void Dispose()
        {
            Context.Dispose();
        }
    }
}