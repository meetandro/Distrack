using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Distrack.Infrastructure.Persistence.Repositories
{
    internal class ImageRepository(ApplicationDbContext context) : IImageRepository
    {
        public async Task<IEnumerable<Image>> CreateRangeAsync(IEnumerable<Image> images)
        {
            await context.Images.AddRangeAsync(images);
            await context.SaveChangesAsync();
            return images;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var image = await context.Images.FirstOrDefaultAsync(i => i.Id == id);
            if (image is not null)
            {
                context.Images.Remove(image);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
