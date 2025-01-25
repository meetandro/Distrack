using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Categories.Queries.GetAllCategories
{
    internal class GetAllCategoriesQueryHandler(ICategoryRepository categoryRepository)
        : IRequestHandler<GetAllCategoriesQuery, IEnumerable<GetAllCategoriesResponse>>
    {
        public async Task<IEnumerable<GetAllCategoriesResponse>> Handle(
            GetAllCategoriesQuery request,
            CancellationToken cancellationToken
        )
        {
            var categories = await categoryRepository.GetAllAsync();

            return categories.Select(c => new GetAllCategoriesResponse(c.Id, c.Name));
        }
    }
}
