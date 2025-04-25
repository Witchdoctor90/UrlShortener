using UrlShortener.Application.Interfaces;
using UrlShortener.Domain;

namespace UrlShortener.Application;

public class ShortUrlService : IShortUrlService
{
    private readonly IRepository<UrlEntity> _repository;
    
    public async Task<UrlEntity?> GetShortUrlAsync(string? longUrl, Guid userGuid)
    {
        if(string.IsNullOrEmpty(longUrl)) 
            throw new ArgumentNullException(nameof(longUrl));

        var entity = await _repository.FirstAsync(x => x.LongUrl == longUrl);
        if (entity is null)
        {
            return await _repository.AddAsync(new UrlEntity(longUrl, GenerateShortCode(), userGuid));
        }
        return entity;
    }

    public async Task<string?> GetLongUrlAsync(string shortCode)
    {
        if(string.IsNullOrEmpty(shortCode))
            throw new ArgumentNullException(nameof(shortCode));
        
        var entity = await _repository.FirstAsync(x => x.ShortCode == shortCode);
        if(entity is null) 
            throw new KeyNotFoundException(nameof(shortCode));
        
        return entity.LongUrl;
    }

    public async Task<IEnumerable<UrlEntity>> GetUrlsForUserAsync(Guid userId)
    {
        var result = await _repository.FindAsync(x => x.UserId == userId);
        return result;
    }

    public async Task<IEnumerable<UrlEntity>> GetAllUrlsAsync()
    {
        return await _repository.GetAll();
    }

    public async Task DeleteUrlAsync(Guid guid)
    {
        await _repository.DeleteAsync(guid);
    }

    private static string GenerateShortCode()
    {
        return Guid.NewGuid().ToString("N")[..8];
    }
}