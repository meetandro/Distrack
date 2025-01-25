using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Collections.Commands.DeleteCollection
{
    internal class DeleteCollectionCommandHandler(ICollectionRepository collectionRepository, IFileService fileService)
        : IRequestHandler<DeleteCollectionCommand, bool>
    {
        public async Task<bool> Handle(
            DeleteCollectionCommand request,
            CancellationToken cancellationToken
        )
        {
            var imageUrls = await collectionRepository.GetImageUrlsForCollectionAsync(request.Id);

            foreach (var imageUrl in imageUrls)
            {
                fileService.DeleteFileInFolder(imageUrl, "images");
            }

            var result = await collectionRepository.DeleteAsync(request.Id);

            return result;
        }
    }
}
