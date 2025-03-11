using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Distrack.Infrastructure.Persistence.Repositories
{
    internal class CollectibleRepository(ApplicationDbContext context) : ICollectibleRepository
    {
        public async Task<Collectible?> GetByIdAsync(int id)
        {
            var collectible = await context
                .Collectibles
                .Include(c => c.CollectibleTags)
                .ThenInclude(ct => ct.Tag)
                .Include(c => c.Images)
                .FirstOrDefaultAsync(c => c.Id == id);
            return collectible;
        }

        public async Task<Collectible> GetByIdIncludeImagesAsync(int id)
        {
            var collectible = await context
                .Collectibles.Include(c => c.Images)
                .FirstOrDefaultAsync(c => c.Id == id);
            return collectible;
        }

        public async Task<Collectible> CreateAsync(Collectible collectible)
        {
            await context.Collectibles.AddAsync(collectible);
            await context.SaveChangesAsync();
            return collectible;
        }

        public async Task<Collectible> UpdateAsync(Collectible collectible)
        {
            context.Collectibles.Update(collectible);
            await context.SaveChangesAsync();
            return collectible;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var collectible = await GetByIdAsync(id);
            if (collectible is not null)
            {
                context.Collectibles.Remove(collectible);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
