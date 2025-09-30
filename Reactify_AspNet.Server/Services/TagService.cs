using Reactify_AspNet.Server.Models;

namespace Reactify_AspNet.Server.Services
{
    public class TagService
    {
        private readonly List<TagItem> _tags = new()
        {
            new TagItem { Id = 1, Name = "Cibo" },
            new TagItem { Id = 2, Name = "Cancelleria" },
            new TagItem { Id = 3, Name = "Ferramenta" }
        };

        public IEnumerable<TagItem> GetTags() => _tags;

        public TagItem AddTag(TagItem tag)
        {
            tag.Id = _tags.Count != 0 ? _tags.Max(t => t.Id) + 1 : 1;
            _tags.Add(tag);
            return tag;
        }

    }
}
