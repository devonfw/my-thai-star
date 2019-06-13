using Microsoft.EntityFrameworkCore;
using OASP4Net.Domain.Entities.Models;

namespace OASP4Net.Domain.Entities
{
    public class ModelContext : DbContext
    {
        private readonly string _connectionString;
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

        public ModelContext(string connectionString)
        {
            _connectionString = connectionString;
        }

        public ModelContext(DbContextOptions<ModelContext> options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                #warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(_connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Booking>(entity =>
            {
                entity.HasIndex(e => e.Id)
                    .HasName("sqlite_autoindex_Reservation_1")
                    .IsUnique();

                entity.Property(e => e.BookingDate).HasColumnType("datetime");

                entity.Property(e => e.Canceled).HasDefaultValueSql("((0))");

                entity.Property(e => e.Comments).HasMaxLength(255);

                entity.Property(e => e.CreationDate).HasColumnType("datetime");

                entity.Property(e => e.Email).HasMaxLength(255);

                entity.Property(e => e.ExpirationDate).HasColumnType("datetime");

                entity.Property(e => e.Name).HasMaxLength(120);

                entity.Property(e => e.ReservationToken).HasMaxLength(60);

                entity.HasOne(d => d.Table)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.TableId)
                    .HasConstraintName("FK_Reservation_table");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Booking)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Reservation_0_0");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.Name).HasMaxLength(120);
            });

            modelBuilder.Entity<Dish>(entity =>
            {
                entity.Property(e => e.Description).HasColumnType("nvarchar(4000)");

                entity.Property(e => e.Name).HasMaxLength(120);

                entity.Property(e => e.Price).HasColumnType("decimal(16, 10)");

                entity.HasOne(d => d.IdImageNavigation)
                    .WithMany(p => p.Dish)
                    .HasForeignKey(d => d.IdImage)
                    .HasConstraintName("FK_Dish_image");
            });

            modelBuilder.Entity<DishCategory>(entity =>
            {
                entity.HasOne(d => d.IdCategoryNavigation)
                    .WithMany(p => p.DishCategory)
                    .HasForeignKey(d => d.IdCategory)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DishCategory_0_0");

                entity.HasOne(d => d.IdDishNavigation)
                    .WithMany(p => p.DishCategory)
                    .HasForeignKey(d => d.IdDish)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DishCategory_1_0");
            });

            modelBuilder.Entity<DishIngredient>(entity =>
            {
                entity.HasOne(d => d.IdDishNavigation)
                    .WithMany(p => p.DishIngredient)
                    .HasForeignKey(d => d.IdDish)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DishIngredient_1_0");

                entity.HasOne(d => d.IdIngredientNavigation)
                    .WithMany(p => p.DishIngredient)
                    .HasForeignKey(d => d.IdIngredient)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_DishIngredient_0_0");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.Extension).HasMaxLength(20);

                entity.Property(e => e.MimeType).HasMaxLength(10);
            });

            modelBuilder.Entity<Ingredient>(entity =>
            {
                entity.Property(e => e.Description).HasColumnType("text");

                entity.Property(e => e.Name).HasMaxLength(120);

                entity.Property(e => e.Price).HasColumnType("decimal(16, 10)");
            });

            modelBuilder.Entity<InvitedGuest>(entity =>
            {
                entity.HasIndex(e => e.Id)
                    .HasName("sqlite_autoindex_InvitationGuest_1")
                    .IsUnique();

                entity.Property(e => e.Email).HasMaxLength(60);

                entity.Property(e => e.GuestToken).HasMaxLength(60);

                entity.Property(e => e.ModificationDate).HasColumnType("datetime");

                entity.HasOne(d => d.IdBookingNavigation)
                    .WithMany(p => p.InvitedGuest)
                    .HasForeignKey(d => d.IdBooking)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_InvitationGuest_0_0");
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasOne(d => d.IdInvitationGuestNavigation)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.IdInvitationGuest)
                    .HasConstraintName("FK_Order_0_1");

                entity.HasOne(d => d.IdReservationNavigation)
                    .WithMany(p => p.Order)
                    .HasForeignKey(d => d.IdReservation)
                    .HasConstraintName("FK_Order_0_0");
            });

            modelBuilder.Entity<OrderDishExtraIngredient>(entity =>
            {
                entity.HasOne(d => d.IdIngredientNavigation)
                    .WithMany(p => p.OrderDishExtraIngredient)
                    .HasForeignKey(d => d.IdIngredient)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderDIshExtraIngredient_1_0");

                entity.HasOne(d => d.IdOrderLineNavigation)
                    .WithMany(p => p.OrderDishExtraIngredient)
                    .HasForeignKey(d => d.IdOrderLine)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderDIshExtraIngredient_0_0");
            });

            modelBuilder.Entity<OrderLine>(entity =>
            {
                entity.Property(e => e.Comment).HasMaxLength(255);

                entity.HasOne(d => d.IdDishNavigation)
                    .WithMany(p => p.OrderLine)
                    .HasForeignKey(d => d.IdDish)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderLine_1_0");

                entity.HasOne(d => d.IdOrderNavigation)
                    .WithMany(p => p.OrderLine)
                    .HasForeignKey(d => d.IdOrder)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderLine_0_0");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.Email).HasMaxLength(60);

                entity.Property(e => e.Password).HasMaxLength(255);

                entity.Property(e => e.UserName).HasMaxLength(120);

                entity.HasOne(d => d.IdRoleNavigation)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.IdRole)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_0_0");
            });

            modelBuilder.Entity<UserFavourite>(entity =>
            {
                entity.HasOne(d => d.IdDishNavigation)
                    .WithMany(p => p.UserFavourite)
                    .HasForeignKey(d => d.IdDish)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserFavourite_0_0");

                entity.HasOne(d => d.IdUserNavigation)
                    .WithMany(p => p.UserFavourite)
                    .HasForeignKey(d => d.IdUser)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserFavourite_1_0");
            });

            modelBuilder.Entity<UserRole>(entity =>
            {
                entity.Property(e => e.Name).HasMaxLength(120);
            });
        }
    }
}
