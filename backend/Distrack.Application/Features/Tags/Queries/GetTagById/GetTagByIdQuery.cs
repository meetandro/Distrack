using MediatR;

namespace Distrack.Application.Features.Tags.Queries.GetTagById
{
    public sealed record GetTagByIdQuery(int Id) : IRequest<GetTagByIdResponse>;
}
