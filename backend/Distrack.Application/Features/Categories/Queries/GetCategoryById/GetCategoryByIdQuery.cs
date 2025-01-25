using MediatR;

namespace Distrack.Application.Features.Categories.Queries.GetCategoryById
{
    public sealed record GetCategoryByIdQuery(int Id) : IRequest<GetCategoryByIdResponse>;
}
