using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using MediatR;

namespace Distrack.Application.Features.Collectibles.Commands.AddTagsToCollectible
{
    internal class AddTagsToCollectibleCommandHandler(
        ICollectibleRepository collectibleRepository,
        ITagRepository tagRepository
    ) : IRequestHandler<AddTagsToCollectibleCommand, bool>
    {
        public async Task<bool> Handle(
            AddTagsToCollectibleCommand request,
            CancellationToken cancellationToken
        )
        {
            var collectible = await collectibleRepository.GetByIdAsync(request.Id);

            collectible.CollectibleTags.Clear();

            var tags = await tagRepository.GetByIdsAsync(request.TagIds);

            foreach (var tag in tags)
            {
                var newTag = new CollectibleTag { CollectibleId = collectible.Id, TagId = tag.Id };
                collectible.CollectibleTags.Add(newTag);
            }

            await collectibleRepository.UpdateAsync(collectible);

            return true;
        }
    }
}
