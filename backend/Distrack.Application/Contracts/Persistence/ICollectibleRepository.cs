using Distrack.Domain.Entities;

namespace Distrack.Application.Contracts.Persistence
{
    public interface ICollectibleRepository
    {
        Task<IEnumerable<Collectible>> GetAllAsync();

        Task<Collectible?> GetByIdAsync(int id);

        Task<Collectible> GetByIdIncludeImagesAsync(int id);

        Task<Collectible> CreateAsync(Collectible collectible);

        Task<Collectible> UpdateAsync(Collectible collectible);

        Task<bool> DeleteAsync(int id);
    }
}
