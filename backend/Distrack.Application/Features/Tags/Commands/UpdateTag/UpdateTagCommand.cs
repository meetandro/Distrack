using MediatR;

namespace Distrack.Application.Features.Tags.Commands.UpdateTag
{
    public sealed record UpdateTagCommand(int Id, string Name, string Hex, int CollectionId)
        : IRequest<UpdateTagResponse>;
}
