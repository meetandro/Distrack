using MediatR;

namespace Distrack.Application.Features.Collections.Commands.CreateCollection
{
    public sealed record CreateCollectionCommand(string Name, string? Description) : IRequest<int>;
}
