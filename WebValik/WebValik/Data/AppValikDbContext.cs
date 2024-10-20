using Microsoft.EntityFrameworkCore;
using WebValik.Data.Entities;

namespace WebValik.Data
{
    public class AppValikDbContext : DbContext
    {
        public AppValikDbContext(DbContextOptions<AppValikDbContext> options)
            : base(options) { }
        public DbSet<CategoryEntity> Categories { get; set; } //Каталог елементів CategoryEntity
        public DbSet<ProductEntity> Products { get; set; } //Каталог елементів ProductEntity
        public DbSet<ProductImageEntity> ProductImages { get; set; } //Каталог елементів ProductImageEntity
    }
}
