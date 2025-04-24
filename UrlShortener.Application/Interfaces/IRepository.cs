using System.Linq.Expressions;

namespace UrlShortener.Application.Interfaces;

public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(string id);
    Task<T?> FirstAsync(Expression<Func<T, bool>> predicate);
    Task<IEnumerable<T>?> FindAsync(Expression<Func<T, bool>> predicate);
    Task<IReadOnlyList<T>> GetAllForUserAsync(Guid userId);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}