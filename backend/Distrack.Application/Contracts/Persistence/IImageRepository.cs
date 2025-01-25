using Distrack.Domain.Entities;

namespace Distrack.Application.Contracts.Persistence
{
    public interface IImageRepository
    {
        Task<IEnumerable<Image>> CreateRangeAsync(IEnumerable<Image> images);

        Task<bool> DeleteAsync(int id);
    }
}
