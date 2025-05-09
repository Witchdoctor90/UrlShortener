﻿using UrlShortener.Application.Interfaces;
using UrlShortener.Domain;

namespace UrlShortener.Application;

public class ShortUrlService : IShortUrlService
{
    private readonly IRepository<UrlEntity> _repository;

    public ShortUrlService(IRepository<UrlEntity> repository)
    {
        _repository = repository;
    }

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

    public async Task<UrlEntity> GetUrlById(Guid guid)
    {
        var result = await _repository.GetByIdAsync(guid);
        if (result is null) throw new KeyNotFoundException(nameof(guid));
        return result;
    }

    public async Task<IEnumerable<UrlEntity>> GetUrlsForUserAsync(Guid userId)
    {
        var result = await _repository.FindAsync(x => x.UserId == userId);
        return !result.Any() ? [] : result;
    }

    public async Task<IEnumerable<UrlEntity>> GetAllUrlsAsync()
    {
        var result = await _repository.GetAll();
        return !result.Any() ? [] : result;
    }

    public async Task DeleteUrlAsync(Guid guid, Guid userGuid)
    {
        var entity = await _repository.FirstAsync(x => x.Id == guid);
        if(entity.UserId != userGuid) throw new UnauthorizedAccessException();
        await _repository.DeleteAsync(guid);
    }
    

    private static string GenerateShortCode()
    {
        return Guid.NewGuid().ToString("N")[..8];
    }
    
}