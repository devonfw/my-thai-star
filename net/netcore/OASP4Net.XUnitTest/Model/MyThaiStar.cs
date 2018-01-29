using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace OASP4Net.Test.Model
{
    public partial class MyThaiStar : DbContext
    {
        public MyThaiStar(DbContextOptions<MyThaiStar> options) : base(options)
        {
        }

        public virtual DbSet<Booking> Booking { get; set; }
        public virtual DbSet<Category> Category { get; set; }
        public virtual DbSet<Dish> Dish { get; set; }
        public virtual DbSet<DishCategory> DishCategory { get; set; }
        public virtual DbSet<DishIngredient> DishIngredient { get; set; }
        public virtual DbSet<Image> Image { get; set; }
        public virtual DbSet<Ingredient> Ingredient { get; set; }
        public virtual DbSet<InvitedGuest> InvitedGuest { get; set; }
        public virtual DbSet<Order> Order { get; set; }
        public virtual DbSet<OrderDishExtraIngredient> OrderDishExtraIngredient { get; set; }
        public virtual DbSet<OrderLine> OrderLine { get; set; }
        public virtual DbSet<Table> Table { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<UserFavourite> UserFavourite { get; set; }
        public virtual DbSet<UserRole> UserRole { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
//                optionsBuilder.UseSqlite(@"DataSource=c:\MyThaiStar\netcore\OASP4Net.Test\Database\MyThaiStar.db");
//            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasIndex(e => e.Id)
                    .HasName("Booking_sqlite_autoindex_Reservation_1")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.BookingDate)
                    .IsRequired()
                    .HasColumnType("datetime");

                entity.Property(e => e.Canceled)
                    .IsRequired()
                    .HasColumnType("bit")
                    .HasDefaultValueSql("0");

                entity.Property(e => e.Comments).HasColumnType("nvarchar(255)");

                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.Email).HasColumnType("nvarchar(255)");

                entity.Property(e => e.ExpirationDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasColumnType("nvarchar(120)");

                entity.Property(e => e.ReservationToken).HasColumnType("nvarchar(60)");

                entity.HasOne(d => d.Table)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.TableId);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.UserId);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description).HasColumnType("nvarchar(255)");

                entity.Property(e => e.Name).HasColumnType("nvarchar(120)");
            });

            modelBuilder.Entity<Dish>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description).HasColumnType("nvarchar(4000)");

                entity.Property(e => e.Name).HasColumnType("nvarchar(120)");

                entity.Property(e => e.Price).HasColumnType("numeric");

                entity.HasOne(d => d.IdImageNavigation)
                    .WithMany(p => p.Dish)
                    .HasForeignKey(d => d.IdImage);
            });

            modelBuilder.Entity<DishCategory>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.IdCategoryNavigation)
                    .WithMany(p => p.DishCategory)
                    .HasForeignKey(d => d.IdCategory)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.IdDishNavigation)
                    .WithMany(p => p.DishCategory)
                    .HasForeignKey(d => d.IdDish)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<DishIngredient>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.IdDishNavigation)
                    .WithMany(p => p.DishIngredient)
                    .HasForeignKey(d => d.IdDish)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.IdIngredientNavigation)
                    .WithMany(p => p.DishIngredient)
                    .HasForeignKey(d => d.IdIngredient)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Content).HasColumnType("nvarchar");

                entity.Property(e => e.Extension).HasColumnType("nvarchar(20)");

                entity.Property(e => e.MimeType).HasColumnType("nvarchar(10)");

                entity.Property(e => e.Name).HasColumnType("nvarchar");
            });

            modelBuilder.Entity<Ingredient>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Description).HasColumnType("text(2147483647)");

                entity.Property(e => e.Name).HasColumnType("nvarchar(120)");

                entity.Property(e => e.Price).HasColumnType("numeric");
            });

            modelBuilder.Entity<InvitedGuest>(entity =>
            {
                entity.HasIndex(e => e.Id)
                    .HasName("InvitedGuest_sqlite_autoindex_InvitationGuest_1")
                    .IsUnique();

                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Accepted).HasColumnType("bit");

                entity.Property(e => e.Email).HasColumnType("nvarchar(60)");

                entity.Property(e => e.GuestToken).HasColumnType("nvarchar(60)");

                entity.Property(e => e.ModificationDate).HasColumnType("datetime");

                entity.HasOne(d => d.IdBookingNavigation)
                    .WithMany(p => p.InvitedGuest)
                    .HasForeignKey(d => d.IdBooking)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.IdInvitationGuestNavigation)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.IdInvitationGuest);

                entity.HasOne(d => d.IdReservationNavigation)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.IdReservation);
            });

            modelBuilder.Entity<OrderDishExtraIngredient>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.IdIngredientNavigation)
                    .WithMany(p => p.OrderDishExtraIngredient)
                    .HasForeignKey(d => d.IdIngredient)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.IdOrderLineNavigation)
                    .WithMany(p => p.OrderDishExtraIngredient)
                    .HasForeignKey(d => d.IdOrderLine)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<OrderLine>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Comment).HasColumnType("nvarchar(255)");

                entity.HasOne(d => d.IdDishNavigation)
                    .WithMany(p => p.OrderLine)
                    .HasForeignKey(d => d.IdDish)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.IdOrderNavigation)
                    .WithMany(p => p.OrderLine)
                    .HasForeignKey(d => d.IdOrder)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<Table>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Email).HasColumnType("nvarchar(60)");

                entity.Property(e => e.Password).HasColumnType("nvarchar(255)");

                entity.Property(e => e.UserName).HasColumnType("nvarchar(120)");

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.IdRole)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<UserFavourite>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.IdDishNavigation)
                    .WithMany(p => p.UserFavourite)
                    .HasForeignKey(d => d.IdDish)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.UserFavourite)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Active).HasColumnType("bit");

                entity.Property(e => e.Name).HasColumnType("nvarchar(120)");
            });
        }
    }
}
