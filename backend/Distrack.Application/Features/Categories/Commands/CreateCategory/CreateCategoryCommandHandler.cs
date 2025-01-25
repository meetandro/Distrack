using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using MediatR;

namespace Distrack.Application.Features.Categories.Commands.CreateCategory
{
    internal class CreateCategoryCommandHandler(ICategoryRepository categoryRepository)
        : IRequestHandler<CreateCategoryCommand, int>
    {
        public async Task<int> Handle(
            CreateCategoryCommand request,
            CancellationToken cancellationToken
        )
        {
            var category = new Category { Name = request.Name };

            var result = await categoryRepository.CreateAsync(category);

            return result.Id;
        }
    }
}
