using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using OASP4Net.Business.Common.UserManagement.Dto;
using OASP4Net.Business.Common.UserManagement.Service;
using OASP4Net.Infrastructure.JWT;
using Formatting = Newtonsoft.Json.Formatting;

namespace OASP4Net.Business.Common.UserManagement.Controller
{
    [EnableCors("CorsPolicy")]

    public class LoginController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly ILogger<LoginController> _logger;
        private readonly JwtOptions _jwtOptions;
        private readonly ILoginService _loginService;
        private readonly JsonSerializerSettings _serializerSettings;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;

        public LoginController(ILoginService service, IOptions<JwtOptions> jwtOptions, ILogger<LoginController> logger, SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
        {
            _logger = logger;
            _loginService = service;
            _jwtOptions = jwtOptions.Value;
            _signInManager = signInManager;
            _userManager = userManager;
            ThrowIfInvalidOptions(_jwtOptions);

            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.None
            };
        }

        [HttpGet]
        [HttpOptions]
        [Route("/mythaistar/services/rest/security/v1/currentuser")]
        [EnableCors("CorsPolicy")]
        public IActionResult CurrentUser()
        {
            CurrentUserDto result;

            try
            {
                var headerValue = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer", string.Empty).Trim();
                var handler = new JwtSecurityTokenHandler();
                var jwtUser = handler.ReadJwtToken(headerValue);

                if (jwtUser != null)
                {
                    var userId = jwtUser.Claims.FirstOrDefault(c => c.Type == "ID").Value;

                    var user = _userManager.Users.FirstOrDefault(u => u.Id == userId);
                    var userEasyName = user.UserName;
                    _logger.LogInformation($"userEasyName: {userEasyName}");

                    result = new CurrentUserDto
                    {
                        Name = userEasyName,
                        Role = userEasyName.ToLower().Contains("waiter") ? "WAITER" : "CUSTOMER",
                        Id = null,
                        FirstName = user.UserName,
                        LastName = null
                    };
                }
                else
                {
                    result = new CurrentUserDto();
                }
            }
            catch (Exception ex)
            {
                _logger.LogDebug($"{ex.Message} : {ex.InnerException}");
                result = new CurrentUserDto();
            }

            var json = JsonConvert.SerializeObject(result, _serializerSettings);
            return Ok(json);            
        }

        /// <summary>
        /// Gets the  list of available dishes regarding the filter options
        /// </summary>
        /// <param name="loginDto"></param>
        /// <returns></returns>
        /// <response code="200"> Ok. </response>
        /// <response code="401">Unathorized. Autentication fail</response>  
        /// <response code="403">Forbidden. Authorization error.</response>    
        /// <response code="500">Internal Server Error. The search process ended with error.</response>       
        [HttpPost]
        [HttpOptions]
        [Route("/mythaistar/login")]
        [AllowAnonymous]
        [EnableCors("CorsPolicy")]
        public async Task<IActionResult> Login([FromBody]LoginDto loginDto)
        {
            try
            {
                if (loginDto == null) return Ok();
                //var user = _userManager.Users.Where(u => u.UserName.ToLower() == loginDto.UserName.ToLower()).FirstOrDefault();
                //var identity = GetClaimsIdentity(loginDto, user);
                //if (identity == null)
                //{
                //    return BadRequest("Invalid credentials");
                //}
                var loged = _loginService.Login(loginDto.UserName, loginDto.Password);
                if (loged)
                {
                    var userScope = _loginService.GetUserScope(loginDto.UserName);
                    if (!string.IsNullOrEmpty(userScope))
                    {                        
                        var userClaim = GetUserClaim(loginDto);
                        var claims = new List<Claim>
                        {
                            new Claim(JwtRegisteredClaimNames.Iss,  _jwtOptions.Issuer),
                            new Claim(JwtRegisteredClaimNames.Sub, loginDto.UserName),
                            new Claim(ClaimTypes.Role, userScope),
                            new Claim("scope", userScope),
                            new Claim("roles", userScope),
                            new Claim(JwtRegisteredClaimNames.UniqueName, loginDto.UserName),                           
                            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),

                        };
                        if (userClaim != null) claims.Add(userClaim);
                        var user = _userManager.Users.FirstOrDefault(u => u.UserName.ToLower() == loginDto.UserName.ToLower());
                        var identity = GetClaimsIdentity(loginDto, user, claims);

                        var handler = new JwtSecurityTokenHandler();
                        var securityToken = handler.CreateToken(new SecurityTokenDescriptor
                        {
                            Issuer = _jwtOptions.Issuer,
                            Audience = _jwtOptions.Audience,
                            SigningCredentials = _jwtOptions.SigningCredentials,
                            Subject = identity.Result,
                            Expires = _jwtOptions.Expiration.AddMinutes(30),
                        });

                        var result = await _signInManager.PasswordSignInAsync(loginDto.UserName, "*Dev0nMts2017", true, lockoutOnFailure: false);
                        if (!result.Succeeded) return StatusCode((int)HttpStatusCode.Unauthorized, "Login Error");
                        var encodedJwt = handler.WriteToken(securityToken);

                        Response.Headers.Add("Access-Control-Expose-Headers", "Authorization");
                        Response.Headers.Add("X-Content-Type-Options", "nosniff");
                        Response.Headers.Add("X-Frame-Options", "DENY");
                        Response.Headers.Add("X-XSS-Protection", "1;mode=block");
                        Response.Headers.Add("X-Application-Context", "restaurant:h2mem:8081");
                        Response.Headers.Add("Authorization", $"{JwtConst.TokenPrefix} {encodedJwt}");

                        return Ok(encodedJwt);
                    }
                }
                Response.Headers.Clear();
                return StatusCode((int)HttpStatusCode.Unauthorized, "Login Error");
            }
            catch (Exception ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, $"{ex.Message} : {ex.InnerException}");
            }
        }


        #region private methods
        private static void ThrowIfInvalidOptions(JwtOptions options)
        {
            if (options == null) throw new ArgumentNullException(nameof(options));

            if (options.ValidFor <= TimeSpan.Zero)
            {
                throw new ArgumentException("Must be a non-zero TimeSpan.", nameof(JwtOptions.ValidFor));
            }

            if (options.SigningCredentials == null)
            {
                throw new ArgumentNullException(nameof(JwtOptions.SigningCredentials));
            }

            if (options.JtiGenerator == null)
            {
                throw new ArgumentNullException(nameof(JwtOptions.JtiGenerator));
            }
        }

        private static Task<ClaimsIdentity> GetClaimsIdentity(LoginDto user, ApplicationUser userApp, List<Claim> claims)
        {

            if (user == null) return Task.FromResult<ClaimsIdentity>(null);
            if (user.UserName == "waiter" &&
                user.Password == "waiter")
            {
                claims.AddRange(new[]
                {
                    new Claim("ID", userApp.Id),
                    new Claim("MTSWaiter", "waiter")
                });
                return Task.FromResult(new ClaimsIdentity(new GenericIdentity(user.UserName, "TokenAuth"), claims));
            }

            if (user.UserName == "user0" &&
                user.Password == "password")
            {
                claims.AddRange(new[]
                {
                    new Claim("ID", userApp.Id),
                    new Claim("MTSCustomer", "customer")
                });
                return Task.FromResult(new ClaimsIdentity(new GenericIdentity(user.UserName, "TokenAuth"), claims));
            }

            // Credentials are invalid, or account doesn't exist
            return Task.FromResult<ClaimsIdentity>(null);
        }

        private Claim GetUserClaim(LoginDto user)
        {
            if (user.UserName == "waiter" &&
                user.Password == "waiter")
            {
                return new Claim("MTSWaiter", "waiter");
            }

            if (user.UserName == "user0" &&
                user.Password == "password")
            {
                return new Claim("MTSCustomer", "customer");
            }

            return null;

        }
        #endregion
    }
}
