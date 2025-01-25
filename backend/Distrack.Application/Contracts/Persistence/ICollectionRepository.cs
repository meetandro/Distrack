using Distrack.Domain.Entities;

namespace Distrack.Application.Contracts.Persistence
{
    public interface ICollectionRepository
    {
        Task<IEnumerable<Collection>> GetAllAsync();

        Task<IQueryable<Collectible>> GetCollectiblesForCollectionAsync(int id);

        Task<IEnumerable<Tag>> GetTagsForCollectionAsync(int id);

        Task<IEnumerable<string>> GetImageUrlsForCollectionAsync(int id);

        Task<Collection?> GetByIdAsync(int id);

        Task<Collection> CreateAsync(Collection collection);

        Task<Collection> UpdateAsync(Collection collection);

        Task<bool> DeleteAsync(int id);
    }
}
