using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Tags.Commands.UpdateTag
{
    internal class UpdateTagCommandHandler(ITagRepository tagRepository)
        : IRequestHandler<UpdateTagCommand, UpdateTagResponse>
    {
        public async Task<UpdateTagResponse> Handle(
            UpdateTagCommand request,
            CancellationToken cancellationToken
        )
        {
            var tag = await tagRepository.GetByIdAsync(request.Id);

            tag.Name = request.Name;
            tag.Hex = request.Hex;
            tag.CollectionId = request.CollectionId;

            var result = await tagRepository.UpdateAsync(tag);

            return new UpdateTagResponse(result.Name, result.Hex, result.CollectionId);
        }
    }
}
