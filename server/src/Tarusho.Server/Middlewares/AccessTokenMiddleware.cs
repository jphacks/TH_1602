using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Tarusho.Server.Data;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Tarusho.Server.Models;

namespace Tarusho.Server.Middlewares
{
    public class AccessTokenMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly AccessTokenOptions _options;

        private readonly ApplicationDbContext _context;

        public AccessTokenMiddleware(RequestDelegate next, IOptions<AccessTokenOptions> options, SignInManager<ApplicationUser> signInManager, ApplicationDbContext context)
        {
            _next = next;
            _signInManager = signInManager;
            _options = options.Value;
            _context = context;
        }

        public Task Invoke(HttpContext context)
        {
            if (!context.Request.Path.Equals(_options.Path, StringComparison.Ordinal))
            {
                return _next(context);
            }

            if (!context.Request.Method.Equals("POST")
                          || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request.");
            }

            if (context.User?.Identity?.IsAuthenticated ?? false)
            {
                context.Response.StatusCode = 204;
                return context.Response.WriteAsync("Already signined");
            }

            //if (!context.Request.Headers.Any(c => c.Key == "x-auth-access-token") ||
            //    !context.Request.Headers.Any(c => c.Key == "x-auth-username"))
            //{
            //    context.Response.StatusCode = 401;
            //    return context.Response.WriteAsync("Bad request");
            //}

            try
            {
                var username = context.Request.Form["username"];
                var authToken = context.Request.Form["token"];

                //var authToken = context.Request.Headers.FirstOrDefault(c => c.Key == "x-auth-access-token");
                //var authUserName = context.Request.Headers.FirstOrDefault(c => c.Key == "x-auth-username");

                var user =
                    _context.Users.FirstOrDefault(
                        c => c.UserName == username && c.AccessToken == authToken);

                if (user == null)
                {
                    context.Response.StatusCode = 401;
                    return context.Response.WriteAsync("Authorization failed.");
                }

                _signInManager.SignInAsync(user, true).Wait();
                context.Response.StatusCode = 200;
                return context.Response.WriteAsync("OK");
            }
            catch (Exception ex)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request.");
            }
        }

        //private async Task GenerateToken(HttpContext context)
        //{
        //    var username = context.Request.Form["username"];
        //    var accessToken = context.Request.Form["token"];

        //    var identity = await GetIdentity(username, accessToken);
        //    if (identity == null)
        //    {
        //        context.Response.StatusCode = 400;
        //        await context.Response.WriteAsync("Invalid username or password.");
        //        return;
        //    }

        //    var now = DateTime.UtcNow;

        //    var claims = new Claim[]
        //    {
        //        new Claim(JwtRegisteredClaimNames.Sub, username),
        //        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        //        new Claim(JwtRegisteredClaimNames.Iat,
        //        ((Int32)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1))).TotalSeconds).ToString(),
        //        ClaimValueTypes.Integer64)
        //    };

        //    var jwt = new JwtSecurityToken(
        //        issuer: _options.Issuer,
        //        audience: _options.Audience,
        //        claims: claims,
        //        notBefore: now,
        //        expires: now.Add(_options.Expiration),
        //        signingCredentials: _options.SigningCredentials);
        //    var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

        //    var response = new
        //    {
        //        access_token = encodedJwt,
        //        expires_in = (int)_options.Expiration.TotalSeconds
        //    };

        //    context.Response.ContentType = "application/json";
        //    await context.Response.WriteAsync(JsonConvert.SerializeObject(response, new JsonSerializerSettings { Formatting = Formatting.Indented }));
        //}

        //private Task<ClaimsIdentity> GetIdentity(string username, string token)
        //{
        //    var user = _context.Users.FirstOrDefault(c => c.UserName == username && c.AccessToken == token);
        //    if (user != null)
        //    {
        //        return Task.FromResult(new ClaimsIdentity(new System.Security.Principal.GenericIdentity(username, "Token"), new Claim[] { }));
        //    }

        //    // Credentials are invalid, or account doesn't exist
        //    return Task.FromResult<ClaimsIdentity>(null);
        //}
    }


    public class AccessTokenOptions
    {
        public string Path { get; set; } = "/api/login";
    }

}
