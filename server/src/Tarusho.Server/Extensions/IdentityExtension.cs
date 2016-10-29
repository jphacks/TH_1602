using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Tarusho.Server.Models;

namespace Tarusho.Server.Extensions
{
    public static class IdentityExtension
    {
        public static async Task<ApplicationUser> FindByUserNameOrEmailAsync(this UserManager<ApplicationUser> userManager, string userNameOrEmail)
        {
            if (userNameOrEmail.Contains("@"))
            {
                var user = await userManager.FindByEmailAsync(userNameOrEmail);
                if (user != null && user.EmailConfirmed)
                {
                    return user;
                }
            }
            return await userManager.FindByNameAsync(userNameOrEmail);
        }
    }
}
