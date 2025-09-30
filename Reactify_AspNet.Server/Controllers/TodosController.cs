using Microsoft.AspNetCore.Mvc;
using Reactify_AspNet.Server.Models;
using Reactify_AspNet.Server.Services;
using System.Text.Json;

namespace Reactify_AspNet.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodosController : ControllerBase
    {
        private readonly TodoService _todoService;

        // Costruttore con DI
        public TodosController(TodoService todoService) 
        {
            _todoService = todoService;
        }

        // GET: api/todos
        [HttpGet]
        public IActionResult Get() => Ok(_todoService.GetAll());

        // GET: api/todos/tags
        [HttpGet("tags")]
        public IActionResult GetTags()
        {
            var tags = _todoService.GetAllTags();
            return Ok(tags);
        }

        // GET: api/todos/tag/{tag}
        [HttpGet("tag/{tag}")]
        public IActionResult GetByTag(string tag)
        {
            var filtered = _todoService.GetByTag(tag);
            return Ok(filtered);
        }

        // POST: api/todos
        [HttpPost]
        public IActionResult Post([FromBody] TodoItem item)
        {
            var created = _todoService.Add(item);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        // DELETE: api/todos/{id}
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var success = _todoService.Delete(id);
            return success ? NoContent() : NotFound();
        }

        // PUT: api/todos/{id}
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] TodoItem updatedItem) 
        {
            var result = _todoService.Update(id, updatedItem);
            return result is not null ? Ok(result) : NotFound();
        }
    }
}
