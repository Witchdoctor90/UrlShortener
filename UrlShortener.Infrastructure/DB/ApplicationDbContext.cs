using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using UrlShortener.Domain;
using UrlShortener.Infrastructure.Identity;

namespace UrlShortener.Infrastructure.DB;

public class ApplicationDbContext : IdentityDbContext<AppUser, IdentityRole<Guid>, Guid>
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    public DbSet<UrlEntity> Urls { get; set; }


}