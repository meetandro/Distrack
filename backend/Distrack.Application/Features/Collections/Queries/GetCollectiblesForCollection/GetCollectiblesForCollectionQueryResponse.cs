using Distrack.Domain.Enums;

namespace Distrack.Application.Features.Collections.Queries.GetCollectiblesForCollection
{
    public sealed record GetCollectiblesForCollectionQueryResponse(
        int Id,
        string Name,
        string? Description,
        Color? Color,
        string? Currency,
        decimal? Value,
        Condition? Condition,
        DateTime? AcquiredDate,
        bool? IsPatented,
        int CollectionId,
        int CategoryId,
        IEnumerable<string> Images,
        IEnumerable<TagResponse> Tags
    );

    public sealed record TagResponse(int Id, string Name, string Hex);
}
