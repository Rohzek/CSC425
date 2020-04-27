using NotesAPI.Classes.Connections;
using Microsoft.EntityFrameworkCore;

namespace NoteAPI.Scaffolding
{
    public partial class CSC425Context : DbContext
    {
        public CSC425Context() {}

        public CSC425Context(DbContextOptions<CSC425Context> options): base(options) {}

        public virtual DbSet<Logins> Logins { get; set; }
        public virtual DbSet<NoteViewers> NoteViewers { get; set; }
        public virtual DbSet<Notes> Notes { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql(Settings.Connection, x => x.ServerVersion("10.1.44-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Logins>(entity =>
            {
                entity.HasIndex(e => e.UsersID)
                    .HasName("UserID_Login_FK");

                entity.Property(e => e.LoginsId)
                    .HasColumnName("LoginsID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Ipaddress)
                    .IsRequired()
                    .HasColumnName("IPAddress")
                    .HasColumnType("varchar(50)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.LoginDate).HasColumnType("datetime");

                entity.Property(e => e.Used2Fa)
                    .HasColumnName("Used2FA")
                    .HasColumnType("tinyint(4)");

                entity.Property(e => e.UsersID)
                    .HasColumnName("UsersID")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.Users)
                    .WithMany(p => p.Logins)
                    .HasForeignKey(d => d.UsersID)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("UserID_Login_FK");
            });

            modelBuilder.Entity<NoteViewers>(entity =>
            {
                entity.HasKey(e => e.NoteViewerId)
                    .HasName("PRIMARY");

                entity.ToTable("Note_Viewers");

                entity.HasIndex(e => e.NoteId)
                    .HasName("NoteID");

                entity.HasIndex(e => e.UserId)
                    .HasName("UserID_Note_Viewer_FK");

                entity.Property(e => e.NoteViewerId)
                    .HasColumnName("NoteViewerID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.NoteId)
                    .HasColumnName("NoteID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.Note)
                    .WithMany(p => p.NoteViewers)
                    .HasForeignKey(d => d.NoteId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("NoteID");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.NoteViewers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("UserID_Note_Viewer_FK");
            });

            modelBuilder.Entity<Notes>(entity =>
            {
                entity.HasIndex(e => e.UserId)
                    .HasName("UserID_Note_FK");

                entity.Property(e => e.NotesId)
                    .HasColumnName("NotesID")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Extension)
                    .IsRequired()
                    .HasColumnType("varchar(10)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Note)
                    .IsRequired()
                    .HasColumnType("longtext")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.NoteFileName)
                    .IsRequired()
                    .HasColumnType("longtext")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.ClassId)
                    .IsRequired()
                    .HasColumnType("varchar(50)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.NoteDate).HasColumnType("datetime");

                entity.Property(e => e.NoteFile)
                    .IsRequired()
                    .HasColumnType("blob");

                entity.Property(e => e.UploadDate).HasColumnType("datetime");

                entity.Property(e => e.UserId)
                    .HasColumnName("UserID")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Notes)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("UserID_Note_FK");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.UserId)
                    .HasName("PRIMARY");

                entity.Property(e => e.Username)
                    .HasColumnName("Username")
                    .HasColumnType("varchar(256)");

                entity.Property(e => e.Birthday).HasColumnType("datetime");

                entity.Property(e => e.CreationIp)
                    .IsRequired()
                    .HasColumnName("CreationIP")
                    .HasColumnType("varchar(256)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.UserRole)
                    .IsRequired()
                    .HasColumnName("UserRole")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.VerificationIp)
                    .IsRequired()
                    .HasColumnName("VerificationIP")
                    .HasColumnType("varchar(256)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.EmailAddress)
                    .IsRequired()
                    .HasColumnType("varchar(256)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Gender)
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.LoginAttempts).HasColumnType("int(11)");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnType("varchar(256)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Salt)
                    .IsRequired()
                    .HasColumnType("varchar(256)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.SecretKey)
                    .HasColumnType("longtext")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Secret2FA)
                    .HasColumnType("longtext")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.SessionId)
                    .HasColumnName("SessionID")
                    .HasColumnType("longtext")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Use2Fa).HasColumnName("Use2FA");

                entity.Property(e => e.IsVerified).HasColumnName("IsVerified");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnType("varchar(50)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
