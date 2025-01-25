using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Categories.Queries.GetCategoryById
{
    internal class GetCategoryByIdQueryHandler(ICategoryRepository categoryRepository)
        : IRequestHandler<GetCategoryByIdQuery, GetCategoryByIdResponse>
    {
        public async Task<GetCategoryByIdResponse> Handle(
            GetCategoryByIdQuery request,
            CancellationToken cancellationToken
        )
        {
            var category = await categoryRepository.GetByIdAsync(request.Id);

            return new GetCategoryByIdResponse(
                category.Id,
                category.Name,
                category.Collectibles?.Select(c => c.Id).ToList() ?? []
            );
        }
    }
}
