using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Distrack.Infrastructure.Persistence.Repositories
{
    internal class CategoryRepository(ApplicationDbContext context) : ICategoryRepository
    {
        public async Task<IEnumerable<Category>> GetAllAsync()
        {
            var categories = await context.Categories.Include(c => c.Collectibles).ToListAsync();
            return categories;
        }

        public async Task<Category?> GetByIdAsync(int id)
        {
            var category = await context.Categories.FirstOrDefaultAsync(c => c.Id == id);
            return category;
        }

        public async Task<Category> CreateAsync(Category category)
        {
            await context.Categories.AddAsync(category);
            await context.SaveChangesAsync();
            return category;
        }

        public async Task<Category> UpdateAsync(Category category)
        {
            context.Categories.Update(category);
            await context.SaveChangesAsync();
            return category;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await GetByIdAsync(id);
            if (category is not null)
            {
                context.Categories.Remove(category);
                await context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
