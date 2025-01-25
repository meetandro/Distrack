using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Collections.Queries.GetAllCollections
{
    internal class GetAllCollectionsQueryHandler(ICollectionRepository collectionRepository)
        : IRequestHandler<GetAllCollectionsQuery, IEnumerable<GetAllCollectionsResponse>>
    {
        public async Task<IEnumerable<GetAllCollectionsResponse>> Handle(
            GetAllCollectionsQuery request,
            CancellationToken cancellationToken
        )
        {
            var collections = await collectionRepository.GetAllAsync();

            return collections.Select(c => new GetAllCollectionsResponse(
                c.Id,
                c.Name,
                c.Description,
                c.CreatedDate,
                c.Collectibles?.Select(cc => cc.Id).ToList() ?? []
            ));
        }
    }
}
