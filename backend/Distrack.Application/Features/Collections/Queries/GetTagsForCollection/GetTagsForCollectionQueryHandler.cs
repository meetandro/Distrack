using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Collections.Queries.GetTagsForCollection
{
    internal class GetTagsForCollectionQueryHandler(ICollectionRepository collectionRepository)
        : IRequestHandler<GetTagsForCollectionQuery, IEnumerable<GetTagsForCollectionResponse>>
    {
        public async Task<IEnumerable<GetTagsForCollectionResponse>> Handle(
            GetTagsForCollectionQuery request,
            CancellationToken cancellationToken
        )
        {
            var tags = await collectionRepository.GetTagsForCollectionAsync(request.Id);

            return tags.Select(t => new GetTagsForCollectionResponse(
                t.Id,
                t.Name,
                t.Hex,
                t.CollectionId,
                t.CollectibleTags?.Select(c => c.CollectibleId).ToList() ?? []
            ));
        }
    }
}
