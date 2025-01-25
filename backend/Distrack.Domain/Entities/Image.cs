namespace Distrack.Domain.Entities
{
    public class Image
    {
        public int Id { get; set; }

        public string Url { get; set; }

        public string? Alt { get; set; }

        public DateTime CreatedDate { get; set; }

        public int CollectibleId { get; set; }
    }
}
