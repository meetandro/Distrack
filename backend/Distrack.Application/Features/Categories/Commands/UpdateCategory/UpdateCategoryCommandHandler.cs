using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Categories.Commands.UpdateCategory
{
    internal class UpdateCategoryCommandHandler(ICategoryRepository categoryRepository)
        : IRequestHandler<UpdateCategoryCommand, UpdateCategoryResponse>
    {
        public async Task<UpdateCategoryResponse> Handle(
            UpdateCategoryCommand request,
            CancellationToken cancellationToken
        )
        {
            var category = await categoryRepository.GetByIdAsync(request.Id);

            category.Name = request.Name;

            var result = await categoryRepository.UpdateAsync(category);

            return new UpdateCategoryResponse(result.Name);
        }
    }
}
