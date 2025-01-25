using MediatR;

namespace Distrack.Application.Features.Collections.Queries.GetAllCollections
{
    public sealed record GetAllCollectionsQuery : IRequest<IEnumerable<GetAllCollectionsResponse>>;
}
