using MediatR;

namespace Distrack.Application.Features.Tags.Commands.DeleteTag
{
    public sealed record DeleteTagCommand(int Id) : IRequest<bool>;
}
