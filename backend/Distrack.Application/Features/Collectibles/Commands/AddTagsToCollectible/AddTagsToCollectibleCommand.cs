using MediatR;

namespace Distrack.Application.Features.Collectibles.Commands.AddTagsToCollectible
{
    public sealed record AddTagsToCollectibleCommand(int Id, List<int> TagIds) : IRequest<bool>;
}
