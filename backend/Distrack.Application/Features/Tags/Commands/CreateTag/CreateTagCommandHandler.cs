using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using MediatR;

namespace Distrack.Application.Features.Tags.Commands.CreateTag
{
    internal class CreateTagCommandHandler(ITagRepository tagRepository)
        : IRequestHandler<CreateTagCommand, int>
    {
        public async Task<int> Handle(CreateTagCommand request, CancellationToken cancellationToken)
        {
            var tag = new Tag
            {
                Name = request.Name,
                Hex = request.Hex,
                CollectionId = request.CollectionId,
            };

            var result = await tagRepository.CreateAsync(tag);

            return result.Id;
        }
    }
}
