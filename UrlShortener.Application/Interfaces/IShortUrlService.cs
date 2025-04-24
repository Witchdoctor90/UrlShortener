using UrlShortener.Domain;

namespace UrlShortener.Application;

public interface IShortUrlService
{
    Task<UrlEntity> GetShortUrlAsync(string? longUrl, Guid userGuid);
    Task<string?> GetLongUrlAsync(string shortCode);
    Task<IReadOnlyList<UrlEntity>> GetUrlsForUserAsync(Guid userId);

}