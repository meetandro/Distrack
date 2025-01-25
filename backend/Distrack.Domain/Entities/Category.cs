namespace Distrack.Domain.Entities
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Collectible> Collectibles { get; set; }
    }
}
