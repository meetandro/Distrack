using MediatR;

namespace Distrack.Application.Features.Collectibles.Queries.GetCollectibleById
{
    public sealed record GetCollectibleByIdQuery(int Id) : IRequest<GetCollectibleByIdResponse>;
}
