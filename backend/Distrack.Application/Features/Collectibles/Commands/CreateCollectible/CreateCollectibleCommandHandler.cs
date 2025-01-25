using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using MediatR;

namespace Distrack.Application.Features.Collectibles.Commands.CreateCollectible
{
    internal class CreateCollectibleCommandHandler(
        ICollectibleRepository collectibleRepository,
        IImageRepository imageRepository,
        IFileService fileService
    ) : IRequestHandler<CreateCollectibleCommand, int>
    {
        public async Task<int> Handle(
            CreateCollectibleCommand request,
            CancellationToken cancellationToken
        )
        {
            var collectible = new Collectible
            {
                Name = request.Name,
                Description = request.Description,
                Color = request.Color,
                Currency = request.Currency,
                Value = request.Value,
                Condition = request.Condition,
                AcquiredDate = request.AcquiredDate,
                IsPatented = request.IsPatented,
                CategoryId = request.CategoryId,
                CollectionId = request.CollectionId,
            };

            var result = await collectibleRepository.CreateAsync(collectible);

            if (request.Images is not null && request.Images.Any())
            {
                var imageUrls = new List<Image>();

                foreach (var file in request.Images)
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

            return result.Id;
        }
    }
}
