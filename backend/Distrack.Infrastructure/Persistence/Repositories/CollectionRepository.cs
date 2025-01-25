using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Distrack.Infrastructure.Persistence.Repositories
{
    internal class CollectionRepository(ApplicationDbContext context) : ICollectionRepository
    {
        public async Task<IEnumerable<Collection>> GetAllAsync()
        {
            var collections = await context.Collections.ToListAsync();
            return collections;
        }

        public async Task<Collection?> GetByIdAsync(int id)
        {
            var collection = await context.Collections.FirstOrDefaultAsync(c => c.Id == id);
            return collection;
        }

        public async Task<IQueryable<Collectible>> GetCollectiblesForCollectionAsync(int id)
        {
            var collectibles = await context
                .Collections.Include(c => c.Collectibles)
                .ThenInclude(c => c.Images)
                .Include(c => c.Collectibles)
                .ThenInclude(c => c.CollectibleTags)
                .ThenInclude(ct => ct.Tag)
                .Where(c => c.Id == id)
                .Select(c => c.Collectibles)
                .FirstOrDefaultAsync();
            return collectibles.AsQueryable();
        }

        public async Task<IEnumerable<Tag>> GetTagsForCollectionAsync(int id)
        {
            var tags = await context
                .Tags.Include(t => t.CollectibleTags)
                .Where(t => t.CollectionId == id)
                .ToListAsync();
            return tags;
        }

        public async Task<IEnumerable<string>> GetImageUrlsForCollectionAsync(int id)
        {
            var imageUrls = await context
                .Collections.Where(c => c.Id == id)
                .Include(c => c.Collectibles)
                .ThenInclude(col => col.Images)
                .SelectMany(c => c.Collectibles)
                .SelectMany(col => col.Images)
                .Select(img => img.Url)
                .ToListAsync();
            return imageUrls;
        }

        public async Task<Collection> CreateAsync(Collection collection)
        {
            await context.Collections.AddAsync(collection);
            await context.SaveChangesAsync();
            return collection;
        }

        public async Task<Collection> UpdateAsync(Collection collection)
        {
            context.Collections.Update(collection);
            await context.SaveChangesAsync();
            return collection;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var collection = await GetByIdAsync(id);
            if (collection is not null)
            {
                context.Collections.Remove(collection);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
