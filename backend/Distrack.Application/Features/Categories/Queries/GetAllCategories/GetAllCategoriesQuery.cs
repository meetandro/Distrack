using MediatR;

namespace Distrack.Application.Features.Categories.Queries.GetAllCategories
{
    public sealed record GetAllCategoriesQuery : IRequest<IEnumerable<GetAllCategoriesResponse>>;
}
