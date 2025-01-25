namespace Distrack.Domain.Entities
{
    public class Collection
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public DateTime CreatedDate { get; set; }

        public ICollection<Collectible> Collectibles { get; set; }
    }
}
