using Distrack.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Distrack.Infrastructure.Persistence
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : DbContext(options)
    {
        public DbSet<Collectible> Collectibles { get; set; }

        public DbSet<Collection> Collections { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Tag> Tags { get; set; }

        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CollectibleTag>().HasKey(ct => new { ct.CollectibleId, ct.TagId });

            modelBuilder
                .Entity<CollectibleTag>()
                .HasOne(ct => ct.Collectible)
                .WithMany(c => c.CollectibleTags)
                .HasForeignKey(ct => ct.CollectibleId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder
                .Entity<CollectibleTag>()
                .HasOne(ct => ct.Tag)
                .WithMany(t => t.CollectibleTags)
                .HasForeignKey(ct => ct.TagId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Collectible>().Property(i => i.Condition).HasConversion<int>();

            modelBuilder.Entity<Collectible>().Property(i => i.Color).HasConversion<int>();

            modelBuilder
                .Entity<Collectible>()
                .Property(c => c.Value)
                .HasColumnType("decimal(10, 2)");

            modelBuilder
                .Entity<Collectible>()
                .HasOne(c => c.Category)
                .WithMany(cc => cc.Collectibles)
                .HasForeignKey(c => c.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
