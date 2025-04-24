using UrlShortener.Application.Interfaces;
using UrlShortener.Domain;

namespace UrlShortener.Application;

public class ShortUrlService : IShortUrlService
{
    private readonly IRepository<UrlEntity> _repository;
    
    public async Task<UrlEntity> GetShortUrlAsync(string? longUrl, Guid userId)
    {
        if(!Guid.TryParse(userId.ToString(), out var userGuid)) 
            throw new UnauthorizedAccessException("Invalid user id");

        var shortCode = GenerateShortCode();
        
        var url = new UrlEntity(longUrl, shortCode, userGuid);
        await _repository.AddAsync(url);
        
        return url;
    }

    public async Task<string?> GetLongUrlAsync(string shortCode)
    {
        var url = await GetByShortCode(shortCode);
        return url?.LongUrl;
    }

    public Task<IReadOnlyList<UrlEntity>> GetUrlsForUserAsync(Guid userId)
    {
        if (!Guid.TryParse(userId.ToString(), out var userGuid)) throw new UnauthorizedAccessException();
        return _repository.GetAllForUserAsync(userGuid);
    }
    
    private static string GenerateShortCode()
    {
        return Guid.NewGuid().ToString("N")[..8];
    }

    private async Task<UrlEntity> GetByShortCode(string shortCode)
    {
        var entity = await _repository.FirstAsync(x => x.ShortCode == shortCode);
        if(entity == null) throw new KeyNotFoundException();
        return entity;
    }
}