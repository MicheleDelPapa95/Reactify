using Microsoft.AspNetCore.Mvc;
using Reactify_AspNet.Server.Models;
using Reactify_AspNet.Server.Services;

namespace Reactify_AspNet.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TagController: ControllerBase
    {
        private readonly TagService? _tagService;

        public TagController(TagService? tagService) 
        {
            _tagService = tagService;
        }

        // GET: api/tag/tags
        [HttpGet("tags")]
        public IActionResult GetTags()
        {
            return Ok(_tagService?.GetTags());
        }

        // POST: api/tag/tags
        [HttpPost("tags")]
        public IActionResult AddTag([FromBody] TagItem tag)
        {
            var created = _tagService?.AddTag(tag);
            return CreatedAtAction(nameof(GetTags), new { id = created?.Id }, created);
        }

    }
}
