using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Tags.Queries.GetTagById
{
    internal class GetTagByIdQueryHandler(ITagRepository tagRepository)
        : IRequestHandler<GetTagByIdQuery, GetTagByIdResponse>
    {
        public async Task<GetTagByIdResponse> Handle(
            GetTagByIdQuery request,
            CancellationToken cancellationToken
        )
        {
            var tag = await tagRepository.GetByIdAsync(request.Id);

            return new GetTagByIdResponse(
                tag.Id,
                tag.Name,
                tag.Hex,
                tag.CollectionId,
                tag.CollectibleTags?.Select(cc => cc.CollectibleId).ToList() ?? []
            );
        }
    }
}
