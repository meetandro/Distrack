using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Collectibles.Commands.DeleteCollectible
{
    internal class DeleteCollectibleCommandHandler(ICollectibleRepository collectibleRepository, IFileService fileService)
        : IRequestHandler<DeleteCollectibleCommand, bool>
    {
        public async Task<bool> Handle(
            DeleteCollectibleCommand request,
            CancellationToken cancellationToken
        )
        {
            var collectible = await collectibleRepository.GetByIdAsync(request.Id);

            var imageUrls = collectible.Images.Select(i => i.Url);

            foreach (var imageUrl in imageUrls)
            {
                fileService.DeleteFileInFolder(imageUrl, "images");
            }

            var result = await collectibleRepository.DeleteAsync(request.Id);

            return result;
        }
    }
}
