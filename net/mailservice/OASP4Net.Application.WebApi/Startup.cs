using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using Serilog;
using Serilog.Events;
using Swashbuckle.AspNetCore.Swagger;

namespace OASP4Net.Application.WebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private ConfigManager ConfigurationManager { get; set; }

        public Startup(ILoggerFactory loggerFactory)
        {
            ConfigurationManager = new ConfigManager();
            Configuration = ConfigurationManager.GetConfiguration();
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureCorsService(ref services);
            ConfigureSwaggerService(ref services);
            services.AddLogging(loggingBuilder =>
                loggingBuilder.AddSerilog(dispose: true));
            services.AddAutoMapper(typeof(Startup));
            services.AddMvc(options =>
            {
                options.Filters.Add(new OASP4Net.Infrastructure.AOP.AopControllerAttribute(Log.Logger));
                options.Filters.Add(new OASP4Net.Infrastructure.AOP.AopExceptionFilter(Log.Logger));
            }).AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling =
                Newtonsoft.Json.ReferenceLoopHandling.Ignore);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            app.UseStaticFiles();
            app.UseAuthentication();

            ConfigureCorsApp(ref app);
            ConfigureSwaggerApp(ref app);
            ConfigureLog();
            app.UseMvc();
        }


        #region log

        private void ConfigureLog()
        {
            var logFile = string.Format(ConfigurationManager.LogFile, DateTime.Today.ToShortDateString().Replace("/", string.Empty));

            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.File($"{ConfigManager.ApplicationPath}/{ConfigurationManager.LogFolder}/{logFile}")
                .WriteTo.Seq(ConfigurationManager.SeqLogServerUrl)
                .WriteTo.SQLite($"{ConfigManager.ApplicationPath}/{ConfigurationManager.LogFolder}/{ConfigurationManager.LogDatabase}")
                .CreateLogger();
        }


        #endregion

        #region swagger

        private void ConfigureSwaggerService(ref IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info
                {
                    Version = "v1",
                    Title = "My Thai Star Email Service API",
                    Description = "My Thai Star Email Service",
                    TermsOfService = "None",
                    Contact = new Contact { Name = "OASP4Net", Email = "", Url = "" },
                    License = new License { Name = "Use under OSS", Url = "" }
                });

                foreach (var doc in GetXmlDocumentsForSwagger())
                    c.IncludeXmlComments(GetXmlCommentsPath(doc));
            });
            services.AddMvcCore().AddApiExplorer();
        }


        private void ConfigureSwaggerApp(ref IApplicationBuilder app)
        {
            app.UseStaticFiles();
            app.UseMvcWithDefaultRoute();
            app.UseSwagger();
            app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "V1 Docs"); });
        }


        private List<string> GetXmlDocumentsForSwagger()
        {
            var basePath = PlatformServices.Default.Application.ApplicationBasePath;
            return Directory.GetFiles(basePath, "*.Swagger.xml", SearchOption.AllDirectories).ToList();
        }
        #endregion

        #region cors configuration

        private void ConfigureCorsService(ref IServiceCollection services)
        {
            //enables CORS and httpoptions
            services.AddCors(options =>
            {
                options.AddPolicy(ConfigurationManager.CorsPolicy, builder =>
                {
                    builder.AllowAnyOrigin();
                    builder.AllowAnyHeader();
                    builder.AllowAnyMethod();
                    builder.AllowCredentials();
                });
            });
        }

        private void ConfigureCorsApp(ref IApplicationBuilder app)
        {
            app.UseCors(ConfigurationManager.CorsPolicy);
        }

        #endregion

        #region private methods
        private static string GetXmlCommentsPath(string assemblyName)
        {
            var basePath = PlatformServices.Default.Application.ApplicationBasePath;
            return Path.Combine(basePath, assemblyName);
        }
        #endregion
    }
}
