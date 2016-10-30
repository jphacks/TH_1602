using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Newtonsoft.Json;
using Tarusho.Server.Models;
using Tarusho.Server.Models.Data;

namespace Tarusho.Server.Data
{
    public class DbContextSeedData
    {
        private ApplicationDbContext _context;

        public DbContextSeedData(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task SeedAdminUserAsync(string adminPassword)
        {
            var user = new ApplicationUser()
            {
                UserName = "admin",
                NormalizedUserName = "admin"
            };

            var roleStore = new RoleStore<IdentityRole>(_context);
            var userStore = new UserStore<ApplicationUser>(_context);

            if (!_context.Roles.Any(c => c.Name == "admin"))
            {
                await roleStore.CreateAsync(new IdentityRole() { Name = "admin", NormalizedName = "admin" });
            }

            if (!_context.Users.Any(c => c.UserName == user.UserName))
            {
                var hasher = new PasswordHasher<ApplicationUser>();
                var hashed = hasher.HashPassword(user, adminPassword);
                user.PasswordHash = hashed;
                await userStore.CreateAsync(user);
                await userStore.AddToRoleAsync(user, "admin");
            }

            await _context.SaveChangesAsync();
        }


        public async Task SeedUserAsync()
        {
            var userStore = new UserStore<ApplicationUser>(_context);
            var hasher = new PasswordHasher<ApplicationUser>();

            for (int i = 0; i < 20; i++)
            {
                if (!_context.Users.Any(c => c.UserName == $"User{i}"))
                {
                    var user = new ApplicationUser()
                    {
                        UserName = $"User{i}",
                        NormalizedUserName = $"User{i}",
                        DisplayName = $"おぼユーザー{i}"
                    };
                    var hashed = hasher.HashPassword(user, $"userPass{i}");
                    user.PasswordHash = hashed;
                    await userStore.CreateAsync(user);
                    await userStore.AddToRoleAsync(user, "admin");
                }
            }
            await _context.SaveChangesAsync();
        }


        public async Task SeedCategory()
        {
            for (var i = 1; i < 20; i++)
            {
                if (!_context.Categories.Any(c => c.Id == i))
                {
                    var item = new Category()
                    {
                        Name = $"おぼえにくい{i}",
                        Description = $"たるしょ～{i}"
                    };
                    _context.Categories.Add(item);
                    _context.SaveChanges();
                }
            }
        }

        public async Task SeedObjectTag()
        {
            for (var i = 1; i < 20; i++)
            {
                if (!_context.ObjectTags.Any(c => c.Name == $"obo{i}"))
                {
                    //var category = _context.Categories.FirstOrDefault(c => c.Id == 5);
                    var item = new ObjectTag()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Name = $"obo{i}",
                        Description = $"tarusho{i}",
                        //Category = category,
                        CategoryId = 5,
                        ObjectUri = $"tarusho://oboobo{i}-{i/2}",
                        Place = $"{i}のあたり",
                        IsBookingEnabled = i % 2 == 0
                    };
                    _context.ObjectTags.Add(item);
                }
            }
            await _context.SaveChangesAsync();
        }


    }
}
