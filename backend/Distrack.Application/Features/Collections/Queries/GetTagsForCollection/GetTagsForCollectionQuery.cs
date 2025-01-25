using MediatR;

namespace Distrack.Application.Features.Collections.Queries.GetTagsForCollection
{
    public sealed record GetTagsForCollectionQuery(int Id)
        : IRequest<IEnumerable<GetTagsForCollectionResponse>>;
}
