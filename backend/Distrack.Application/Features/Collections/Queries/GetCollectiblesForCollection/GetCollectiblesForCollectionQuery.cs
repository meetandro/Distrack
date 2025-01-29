using Distrack.Application.Models;
using MediatR;

namespace Distrack.Application.Features.Collections.Queries.GetCollectiblesForCollection
{
    public sealed record GetCollectiblesForCollectionQuery(
        int Id,
        int Page,
        int PageSize,
        string? Query = null,
        string? Colors = null,
        string? Currency = null,
        decimal? MinValue = null,
        decimal? MaxValue = null,
        string? Conditions = null,
        string? Categories = null,
        string? Tags = null,
        DateTime? AcquiredFrom = null,
        DateTime? AcquiredTo = null,
        bool? IsPatented = null,
        string? SortBy = null,
        string? SortOrder = null
    ) : IRequest<PaginatedList<GetCollectiblesForCollectionQueryResponse>>;
}
