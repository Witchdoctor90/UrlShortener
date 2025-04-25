using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using UrlShortener.Application.Interfaces;
using UrlShortener.Domain;
using UrlShortener.Infrastructure.DB;

namespace UrlShortener.Infrastructure;

public class UrlRepository : IRepository<UrlEntity>
{
    private readonly ApplicationDbContext _db;
    

    public async Task<UrlEntity?> GetByIdAsync(Guid id)
    {
        var result = await _db.Urls.FirstOrDefaultAsync(x => x.Id == id);
        return result;
    }

    public async Task<UrlEntity?> FirstAsync(Expression<Func<UrlEntity, bool>> predicate)
    {
        var result = await _db.Urls.FirstOrDefaultAsync(predicate);
        return result;
    }

    public async Task<IEnumerable<UrlEntity>> FindAsync(Expression<Func<UrlEntity, bool>> predicate)
    {
        var result = _db.Urls.Where(predicate);
        return await result.ToListAsync();
    }

    public async Task<IEnumerable<UrlEntity>> GetAll()
    {
        var result = await _db.Urls.ToListAsync();
        return result;
    }

    public async Task<IEnumerable<UrlEntity>> GetAllForUserAsync(Guid userId)
    {
        var result = _db.Urls.Where(x => x.UserId == userId);
        return await result.ToListAsync();
    }


    public async Task<UrlEntity> AddAsync(UrlEntity entity)
    {
        _db.Urls.Add(entity); 
        await _db.SaveChangesAsync();
        return entity;
    }

    public Task UpdateAsync(UrlEntity entity)
    {
        _db.Urls.Update(entity);
        _db.Entry(entity).State = EntityState.Modified;
        
        return _db.SaveChangesAsync();
    }

    public Task DeleteAsync(Guid id)
    {
        var entity = _db.Urls.Find(id);
        
        if(entity is null) 
            throw new KeyNotFoundException();
        
        _db.Urls.Remove(entity);
        return _db.SaveChangesAsync();
    }
    
}