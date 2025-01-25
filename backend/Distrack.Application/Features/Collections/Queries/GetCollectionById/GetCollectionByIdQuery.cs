using MediatR;

namespace Distrack.Application.Features.Collections.Queries.GetCollectionById
{
    public sealed record GetCollectionByIdQuery(int Id) : IRequest<GetCollectionByIdResponse>;
}
