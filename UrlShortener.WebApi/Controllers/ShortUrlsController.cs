using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UrlShortener.Application;
using UrlShortener.Application.Interfaces;
using UrlShortener.Domain;

namespace UrlShortener.WebApi.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class ShortUrlsController : ControllerBase
{
    private readonly IShortUrlService _shortUrlService;

    public ShortUrlsController(IShortUrlService shortUrlService)
    {
        _shortUrlService = shortUrlService;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Create([FromBody] string url)
    {
        var userId = User.GetUserId();
        var result = await _shortUrlService.GetShortUrlAsync(url, userId);
        return Ok(result);
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetById([FromBody] string id)
    {
        if (!Guid.TryParse(id, out var guid)) throw new ArgumentException();
        var result = await _shortUrlService.GetUrlById(guid);
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var urls = await _shortUrlService.GetAllUrlsAsync();
        return Ok(urls);
    }

    [HttpDelete]
    [Authorize]
    public async Task<IActionResult> Delete([FromBody] string id)
    {
        var userId = User.GetUserId();
        Guid.TryParse(id, out var guid);
        await _shortUrlService.DeleteUrlAsync(guid, userId);
        return Ok();
    }
}