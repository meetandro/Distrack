using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Collections.Queries.GetCollectionById
{
    internal class GetCollectionByIdQueryHandler(ICollectionRepository collectionRepository)
        : IRequestHandler<GetCollectionByIdQuery, GetCollectionByIdResponse>
    {
        public async Task<GetCollectionByIdResponse> Handle(
            GetCollectionByIdQuery request,
            CancellationToken cancellationToken
        )
        {
            var collection = await collectionRepository.GetByIdAsync(request.Id);

            return new GetCollectionByIdResponse(
                collection.Id,
                collection.Name,
                collection.Description,
                collection.CreatedDate,
                collection.Collectibles?.Select(cc => cc.Id).ToList() ?? []
            );
        }
    }
}
