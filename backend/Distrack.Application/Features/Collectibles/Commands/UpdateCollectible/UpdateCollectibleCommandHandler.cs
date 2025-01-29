using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using MediatR;

namespace Distrack.Application.Features.Collectibles.Commands.UpdateCollectible
{
    internal class UpdateCollectibleCommandHandler(
        ICollectibleRepository collectibleRepository,
        IImageRepository imageRepository,
        IFileService fileService
    ) : IRequestHandler<UpdateCollectibleCommand, UpdateCollectibleResponse>
    {
        public async Task<UpdateCollectibleResponse> Handle(
            UpdateCollectibleCommand request,
            CancellationToken cancellationToken
        )
        {
            var collectible = await collectibleRepository.GetByIdIncludeImagesAsync(request.Id);

            collectible.Name = request.Name;
            collectible.Description = request.Description;
            collectible.Color = request.Color;
            collectible.Currency = request.Currency;
            collectible.Value = request.Value;
            collectible.Condition = request.Condition;
            collectible.AcquiredDate = request.AcquiredDate;
            collectible.IsPatented = request.IsPatented;
            collectible.CategoryId = request.CategoryId;

            if (collectible.Images is not null && collectible.Images.Count > 0)
            {
                foreach (var file in collectible.Images)
                {
                    if (!request.ExistingImages.Contains(file.Url))
                    {
                        fileService.DeleteFileInFolder(file.Url, "images");
                        await imageRepository.DeleteAsync(file.Id);
                    }
                }
            }

            var imageUrls = new List<Image>();

            if (request.NewImages is not null && request.NewImages.Any())
            {
                foreach (var file in request.NewImages)
                {
                    var savedFileName = await fileService.SaveFileInFolderAsync(file, "images");
                    var imageUrl = $"/images/{savedFileName}";

                    imageUrls.Add(
                        new Image
                        {
                            Url = imageUrl,
                            CreatedDate = DateTime.UtcNow,
                            CollectibleId = collectible.Id,
                        }
                    );
                }

                await imageRepository.CreateRangeAsync(imageUrls);
            }

            foreach (var imageUrl in imageUrls)
            {
                collectible.Images.Add(imageUrl);
            }

            var result = await collectibleRepository.UpdateAsync(collectible);

            return new UpdateCollectibleResponse(
                result.Name,
                result.Description,
                result.Color,
                result.Currency,
                result.Value,
                result.Condition,
                result.AcquiredDate,
                result.IsPatented,
                result.CategoryId,
                result.CollectionId
            );
        }
    }
}
