using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using UrlShortener.Application;
using UrlShortener.Application.Interfaces;
using UrlShortener.Infrastructure.DB;
using UrlShortener.Infrastructure.Identity;

namespace UrlShortener.Infrastructure;

public static class InfrastructureServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<ApplicationDbContext>(opts =>
        {
            opts.UseSqlite(connectionString);
        });

        services.AddIdentity<AppUser, IdentityRole<Guid>>(opts =>
        {
            opts.Password.RequiredLength = 6;
            opts.Password.RequireDigit = false;
            opts.Password.RequireLowercase = false;
            opts.Password.RequireNonAlphanumeric = false;
            opts.Password.RequireUppercase = false;
        })
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

        services.AddTransient<IShortUrlService, ShortUrlService>();
        
        return services;
    }
}