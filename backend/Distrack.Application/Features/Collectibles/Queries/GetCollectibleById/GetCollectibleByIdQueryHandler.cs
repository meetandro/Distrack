using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Collectibles.Queries.GetCollectibleById
{
    internal class GetCollectibleByIdQueryHandler(ICollectibleRepository collectibleRepository)
        : IRequestHandler<GetCollectibleByIdQuery, GetCollectibleByIdResponse>
    {
        public async Task<GetCollectibleByIdResponse> Handle(
            GetCollectibleByIdQuery request,
            CancellationToken cancellationToken
        )
        {
            var collectible = await collectibleRepository.GetByIdAsync(request.Id);

            return new GetCollectibleByIdResponse(
                collectible.Id,
                collectible.Name,
                collectible.Description,
                collectible.Color,
                collectible.Currency,
                collectible.Value,
                collectible.Condition,
                collectible.AcquiredDate,
                collectible.IsPatented,
                collectible.CategoryId,
                collectible.CollectionId,
                collectible.Images?.Select(i => i.Url).ToList() ?? [],
                collectible.CollectibleTags?.Select(c => c.TagId).ToList() ?? []
            );
        }
    }
}
