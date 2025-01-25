using MediatR;

namespace Distrack.Application.Features.Collections.Commands.DeleteCollection
{
    public sealed record DeleteCollectionCommand(int Id) : IRequest<bool>;
}
