using Distrack.Domain.Entities;

namespace Distrack.Application.Contracts.Persistence
{
    public interface ITagRepository
    {
        Task<Tag?> GetByIdAsync(int id);

        Task<IEnumerable<Tag>> GetByIdsAsync(List<int> ids);

        Task<Tag> CreateAsync(Tag tag);

        Task<Tag> UpdateAsync(Tag tag);

        Task<bool> DeleteAsync(int id);
    }
}
