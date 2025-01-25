using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Collectibles.Queries.GetAllCollectibles
{
    internal class GetAllCollectiblesQueryHandler(ICollectibleRepository collectibleRepository)
        : IRequestHandler<GetAllCollectiblesQuery, IEnumerable<GetAllCollectiblesResponse>>
    {
        public async Task<IEnumerable<GetAllCollectiblesResponse>> Handle(
            GetAllCollectiblesQuery request,
            CancellationToken cancellationToken
        )
        {
            var collectibles = await collectibleRepository.GetAllAsync();

            return collectibles.Select(c => new GetAllCollectiblesResponse(
                c.Id,
                c.Name,
                c.Description,
                c.Color,
                c.Currency,
                c.Value,
                c.Condition,
                c.AcquiredDate,
                c.IsPatented,
                c.CategoryId,
                c.CollectionId,
                c.Images?.Select(i => i.Url).ToList() ?? [],
                c.CollectibleTags?.Select(t => t.TagId).ToList() ?? []
            ));
        }
    }
}
