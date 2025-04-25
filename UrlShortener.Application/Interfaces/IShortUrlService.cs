using UrlShortener.Domain;

namespace UrlShortener.Application.Interfaces;

public interface IShortUrlService
{
    Task<UrlEntity?> GetShortUrlAsync(string? longUrl, Guid userGuid);
    Task<string?> GetLongUrlAsync(string shortCode);
    Task<IEnumerable<UrlEntity>> GetUrlsForUserAsync(Guid userId);
    Task<IEnumerable<UrlEntity>> GetAllUrlsAsync();
    Task DeleteUrlAsync(Guid guid, Guid userGuid);
}