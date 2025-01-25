using Distrack.Domain.Enums;

namespace Distrack.Domain.Entities
{
    public class Collectible
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public Color? Color { get; set; }

        public string? Currency { get; set; }

        public decimal? Value { get; set; }

        public Condition? Condition { get; set; }

        public DateTime? AcquiredDate { get; set; }

        public bool? IsPatented { get; set; }

        public Category Category { get; set; }

        public int CategoryId { get; set; }

        public Collection Collection { get; set; }

        public int CollectionId { get; set; }

        public ICollection<CollectibleTag> CollectibleTags { get; set; }

        public ICollection<Image> Images { get; set; }
    }
}
