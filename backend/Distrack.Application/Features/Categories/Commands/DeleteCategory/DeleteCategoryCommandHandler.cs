using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Categories.Commands.DeleteCategory
{
    internal class DeleteCategoryCommandHandler(ICategoryRepository categoryRepository)
        : IRequestHandler<DeleteCategoryCommand, bool>
    {
        public async Task<bool> Handle(
            DeleteCategoryCommand request,
            CancellationToken cancellationToken
        )
        {
            var result = await categoryRepository.DeleteAsync(request.Id);

            return result;
        }
    }
}
