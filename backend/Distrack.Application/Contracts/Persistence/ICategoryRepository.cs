﻿using Distrack.Domain.Entities;

namespace Distrack.Application.Contracts.Persistence
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllAsync();

        Task<Category?> GetByIdAsync(int id);

        Task<Category> CreateAsync(Category category);

        Task<Category> UpdateAsync(Category category);

        Task<bool> DeleteAsync(int id);
    }
}
