using UrlShortener.Application.Interfaces;

namespace UrlShortener.WebApi.Middleware;

public class RedirectMiddleware
{
    private readonly RequestDelegate _next;

    public RedirectMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, IShortUrlService shortUrlService)
    {
        var path = context.Request.Path.Value.Trim('/');
        
        if (string.IsNullOrEmpty(path) || !path.StartsWith("short/", StringComparison.OrdinalIgnoreCase))
        {
            await _next(context);
            return;
        }
        
        var code = path["short/".Length..];

        if (string.IsNullOrWhiteSpace(code))
        {
            context.Response.StatusCode = 400;
            await context.Response.WriteAsync("Code is missing");
            return;
        }

        try
        {
            var originalUrl = await shortUrlService.GetLongUrlAsync(code);
            context.Response.Redirect(originalUrl, permanent: true);
        }
        catch
        {
            context.Response.StatusCode = 404;
            await context.Response.WriteAsync("ShortCode Not Found");
        }
    }
}