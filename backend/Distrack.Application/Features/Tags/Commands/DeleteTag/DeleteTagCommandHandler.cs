using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Tags.Commands.DeleteTag
{
    internal class DeleteTagCommandHandler(ITagRepository tagRepository)
        : IRequestHandler<DeleteTagCommand, bool>
    {
        public async Task<bool> Handle(
            DeleteTagCommand request,
            CancellationToken cancellationToken
        )
        {
            var result = await tagRepository.DeleteAsync(request.Id);

            return result;
        }
    }
}
