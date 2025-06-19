using Microsoft.EntityFrameworkCore;

namespace TaskManager.API.Data
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options) { }

        public DbSet<Models.Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Models.Task>()
                .Property(t => t.Priority)
                .HasConversion<string>();
        }
    }
}
