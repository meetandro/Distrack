using MediatR;

namespace Distrack.Application.Features.Collectibles.Queries.GetAllCollectibles
{
    public sealed record GetAllCollectiblesQuery
        : IRequest<IEnumerable<GetAllCollectiblesResponse>>;
}
