using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Tarusho.Server.Models;
using Tarusho.Server.Models.Data;

namespace Tarusho.Server.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Reservation> Reservations { get; set; }

        public DbSet<ObjectTag> ObjectTags { get; set; }
        
        public DbSet<Category> Categories { get; set; }

        public DbSet<ReservationUser> ReservationUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);


            builder.Entity<ApplicationUser>()
                .HasIndex(c => c.UserName)
                .IsUnique(true);

            // Reservation
            builder.Entity<Reservation>()
                .HasKey(c => c.Id);
            builder.Entity<Reservation>()
                .HasOne(c => c.OwnerUser)
                .WithMany(c => c.OwnReservations)
                .HasForeignKey(c => c.OwnerUserId);
            builder.Entity<Reservation>()
                .HasOne(c => c.ObjectTag)
                .WithMany(c => c.Reservations)
                .HasForeignKey(c => c.ObjectTagId);
            builder.Entity<Reservation>()
                .HasIndex(c => c.ObjectTagId);
            builder.Entity<Reservation>()
                .HasIndex(c => c.OwnerUserId);
            builder.Entity<Reservation>()
                .HasIndex(c => c.StartAt);
            builder.Entity<Reservation>()
                .HasIndex(c => c.EndAt);
            builder.Entity<Reservation>()
                .HasIndex(c => c.Priority);
            builder.Entity<Reservation>()
                .HasIndex(c => c.IsEndless);


            // ObjectTag
            builder.Entity<ObjectTag>()
                .HasKey(c => c.Id);
            builder.Entity<ObjectTag>()
                .HasOne(c => c.Category)
                .WithMany(c => c.ObjectTags)
                .HasForeignKey(c => c.CategoryId);
            builder.Entity<ObjectTag>()
                .HasOne(c => c.InUseReservation)
                .WithMany()
                .HasForeignKey(c => c.InUseReservationId);
            builder.Entity<ObjectTag>()
                .HasIndex(c => c.ObjectUri);
            builder.Entity<ObjectTag>()
                .HasIndex(c => c.OptionalUri);
            builder.Entity<ObjectTag>()
                .HasIndex(c => c.CategoryId);

            // Category
            builder.Entity<Category>()
                .HasKey(c => c.Id);

            // many-to-many
            builder.Entity<ReservationUser>()
                .HasKey(c => new {c.ReservationId, c.UserId});
            builder.Entity<ReservationUser>()
                .HasOne(c => c.Reservation)
                .WithMany(c => c.ReservationUsers)
                .HasForeignKey(c => c.ReservationId);
            builder.Entity<ReservationUser>()
                .HasOne(c => c.User)
                .WithMany(c => c.ReservationUsers)
                .HasForeignKey(c => c.UserId);

        }
    }
}
