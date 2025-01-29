using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Distrack.Infrastructure.Persistence.Repositories
{
    internal class TagRepository(ApplicationDbContext context) : ITagRepository
    {
        public async Task<Tag?> GetByIdAsync(int id)
        {
            var tag = await context.Tags.FirstOrDefaultAsync(t => t.Id == id);
            return tag;
        }

        public async Task<IEnumerable<Tag>> GetByIdsAsync(List<int> ids)
        {
            var tags = await context.Tags.Where(t => ids.Contains(t.Id)).ToListAsync();
            return tags;
        }

        public async Task<Tag> CreateAsync(Tag tag)
        {
            await context.Tags.AddAsync(tag);
            await context.SaveChangesAsync();
            return tag;
        }

        public async Task<Tag> UpdateAsync(Tag tag)
        {
            context.Tags.Update(tag);
            await context.SaveChangesAsync();
            return tag;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var tag = await GetByIdAsync(id);
            if (tag is not null)
            {
                context.Tags.Remove(tag);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
