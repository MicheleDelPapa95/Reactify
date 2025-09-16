using Reactify_AspNet.Server.Models;

namespace Reactify_AspNet.Server.Services
{
    public class TodoService
    {
        private readonly List<TodoItem> _todos = new()
        {
            new TodoItem {Id = 1, Title = "Latte", IsDeleted = false},
            new TodoItem {Id = 2, Title="Uova", IsDeleted = false},
            new TodoItem {Id = 3, Title="Guanciale", IsDeleted = false},
            new TodoItem {Id = 4, Title = "Pecorino", IsDeleted = false}
        };

        public IEnumerable<TodoItem> GetAll() => _todos;

        public TodoItem? GetById(int id) => _todos.FirstOrDefault(t => t.Id == id);

        public TodoItem Add(TodoItem item) 
        {
            item.Id = _todos.Any() ? _todos.Max(t => t.Id) + 1 : 1;
            _todos.Add(item);
            return item;
        }

        public bool Delete(int id) 
        {
            var todo = GetById(id);
            if (todo == null) return false;
            _todos.Remove(todo);
            return true;
        }

        public TodoItem? Update(int id, TodoItem updateItem) 
        {
            var existing = GetById(id);
            if (existing == null) return null;

            existing.Title = updateItem.Title;
            existing.IsDeleted = updateItem.IsDeleted;

            return existing;
        }
    }
}
