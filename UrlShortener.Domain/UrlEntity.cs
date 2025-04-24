namespace UrlShortener.Domain;

public class UrlEntity
{
    public Guid Id { get; set; } = Guid.NewGuid();
    
    public string? LongUrl { get; set; } = string.Empty;
    public string ShortCode { get; set; } = string.Empty;
    
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public Guid UserId { get; set; } = Guid.Empty;
    
    //Ef constructor
    private UrlEntity() {}

    public UrlEntity(string? longUrl, string shortCode, Guid userId)
    {
        LongUrl = longUrl;
        ShortCode = shortCode;
        UserId = userId;
    }
}