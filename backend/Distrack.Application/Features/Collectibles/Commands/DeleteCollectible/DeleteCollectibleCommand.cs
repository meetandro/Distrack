using MediatR;

namespace Distrack.Application.Features.Collectibles.Commands.DeleteCollectible
{
    public sealed record DeleteCollectibleCommand(int Id) : IRequest<bool>;
}
