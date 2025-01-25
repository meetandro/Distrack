using MediatR;

namespace Distrack.Application.Features.Collections.Commands.UpdateCollection
{
    public sealed record UpdateCollectionCommand(int Id, string Name, string? Description)
        : IRequest<UpdateCollectionResponse>;
}
