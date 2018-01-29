using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using OASP4Net.Infrastructure.JWT.Interfaces;

namespace OASP4Net.Infrastructure.JWT.Implementation
{
    public class JwtTokenService : IJwtTokenService
    {
        public string GenerateToken(string userName, string userScope)
        {
            //userScope should be ROLE_Customer | ROL_Waiter
            var now = new DateTimeOffset(DateTime.UtcNow);
            var signingKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JwtConst.Secret));
            var claims = new[]
            {
                new Claim(JwtConst.ClaimIssuer, JwtConst.Issuer),
                new Claim(JwtRegisteredClaimNames.Sub, userName),
                new Claim(JwtConst.ClaimScope, userScope),
                new Claim(JwtConst.ClaimCreated, now.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64),
                new Claim(JwtConst.ClaimExpiration, now.AddMinutes(60).ToUnixTimeSeconds().ToString(),
                    ClaimValueTypes.Integer64),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, now.ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
            };

            // Create the JWT and write it to a string
            var jwt = new JwtSecurityToken(claims: claims,
                signingCredentials: new SigningCredentials(signingKey, SecurityAlgorithms.HmacSha512));
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}