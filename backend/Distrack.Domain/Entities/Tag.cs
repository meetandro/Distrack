namespace Distrack.Domain.Entities
{
    public class Tag
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Hex { get; set; }

        public int CollectionId { get; set; }

        public Collection Collection { get; set; }

        public ICollection<CollectibleTag> CollectibleTags { get; set; }
    }
}
