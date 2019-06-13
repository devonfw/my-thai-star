using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.PlatformAbstractions;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Serilog.Events;
using Swashbuckle.AspNetCore.Swagger;
using OASP4Net.Infrastructure.JWT.Data;
using OASP4Net.Infrastructure.JWT;
using OASP4Net.Domain.Entities;
using OASP4Net.Business.Common.DishManagement.Service;
using OASP4Net.Business.Common.BookingManagement.Service;
using OASP4Net.Business.Common.OrderManagement.Service;
using OASP4Net.Business.Common.UserManagement.Service;

namespace OASP4Net.Application.WebApi
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private readonly SymmetricSecurityKey _signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtConst.Secret));
        private ConfigManager ConfigurationManager { get; set; }

        public Startup()
        {
            ConfigurationManager = new ConfigManager();
            Configuration = ConfigurationManager.GetConfiguration();
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            ConfigureDbService(ref services);
            ConfigureDIService(ref services);
            ConfigureCorsService(ref services);

            ConfigureSwaggerService(ref services);
            services.AddLogging(loggingBuilder => loggingBuilder.AddSerilog(dispose: true));
            services.AddAutoMapper(typeof(Startup));
            ConfigureJwtService(ref services);
            services.AddMvc(options =>
            {
                options.Filters.Add(new Infrastructure.AOP.AopControllerAttribute(Log.Logger));
                options.Filters.Add(new Infrastructure.AOP.AopExceptionFilter(Log.Logger));
            }).AddJsonOptions(options => options.SerializerSettings.ReferenceLoopHandling =
                Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, DataSeeder seeder)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseBrowserLink();
            }
            app.UseStaticFiles();


            ConfigureCorsApp(ref app);
            ConfigureSwaggerApp(ref app);
            ConfigureLog();
            app.UseMvc();
            seeder.SeedAsync().Wait();
            app.UseAuthentication();
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
                    Title = "OASP4Net API",
                    Description = "A simple ASP.NET Core Web API capable project",
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

        #region DI configuration

        /// <summary>
        /// Transient lifetime services are created each time they are requested. This lifetime works best for lightweight, stateless services.
        /// Scoped lifetime services are created once per request.
        /// Singleton lifetime services are created the first time they are requested (or when ConfigureServices is run if you specify an instance there) and then every subsequent request will use the same instance.
        /// </summary>
        /// <param name="services"></param>
        private void ConfigureDIService(ref IServiceCollection services)
        {
            services.AddTransient<DataSeeder>();
            services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<AuthContext>().AddDefaultTokenProviders();

            services.AddScoped(typeof(Domain.UnitOfWork.Repository.IRepository<>), typeof(Domain.UnitOfWork.Repository.Repository<>));
            services.AddScoped(typeof(Domain.UnitOfWork.UnitOfWork.IUnitOfWork<>), typeof(Domain.UnitOfWork.UnitOfWork.UnitOfWork<>));

            services.AddScoped<Infrastructure.AOP.AopControllerAttribute>();
            services.AddScoped<Infrastructure.AOP.AopExceptionFilter>();

            //services
            //Put your custom services here
            services.AddTransient<IDishService, DishService>();
            services.AddTransient<IBookingService, BookingService>();
            services.AddTransient<IOrderService, OrderService>();
            services.AddTransient<ILoginService, LoginService>();

            //Repositories
            //Put your custom repositories here
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

        #region JWT configuration

        private void ConfigureJwtService(ref IServiceCollection services)
        {

            //Put your claimtypes here
            services.AddAuthorization(options =>
            {
                options.AddPolicy("MTSWaiterPolicy", policy => policy.RequireClaim("MTSWaiter", "waiter"));
                options.AddPolicy("MTSCustomerPolicy", policy => policy.RequireClaim("MTSCustomer", "customer"));
            });

            services.AddAuthentication()
                .AddJwtBearer(cfg =>
                {
                    cfg.Audience = ConfigurationManager.ValidAudienceJwt;
                    cfg.Authority = ConfigurationManager.ValidAudienceJwt;
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = GetTokenValidationParameters();
                });

            services.Configure<JwtOptions>(options =>
            {
                options.Issuer = JwtConst.Issuer;
                options.Audience = JwtConst.Issuer;
                options.SigningCredentials = new SigningCredentials(_signingKey, SecurityAlgorithms.HmacSha512);
            });
        }

        private TokenValidationParameters GetTokenValidationParameters()
        {
            //Jwt decode
            var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtConst.Secret));
            return new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidIssuer = ConfigurationManager.ValidAudienceJwt,

                ValidateAudience = true,
                ValidAudience = ConfigurationManager.ValidAudienceJwt,

                ValidateIssuerSigningKey = true,
                IssuerSigningKey = signingKey,

                RequireExpirationTime = true,
                ValidateLifetime = true,

                ClockSkew = TimeSpan.Zero
            };
        }

        #endregion

        #region database
        /// <summary>
        /// AddDbContextPool .net core 2 boosts performance. See if your data model is compatible.
        /// </summary>
        /// <param name="services"></param>
        private void ConfigureDbService(ref IServiceCollection services)
        {
            //My Thai Star
            services.AddDbContext<ModelContext>(
                options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            //auth4jwt
            services.AddDbContext<AuthContext>(options =>
                options.UseInMemoryDatabase("AuthContext"));
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
