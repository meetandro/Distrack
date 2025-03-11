using Distrack.Domain.Enums;

namespace Distrack.Application.Features.Collectibles.Queries.GetCollectibleById
{
    public sealed record GetCollectibleByIdResponse(
        int Id,
        string Name,
        string? Description,
        Color? Color,
        string? Currency,
        decimal? Value,
        Condition? Condition,
        DateTime? AcquiredDate,
        bool? IsPatented,
        int collectionId,
        int categoryId,
        IEnumerable<string> Images,
        IEnumerable<TagResponse> Tags
    );

    public sealed record TagResponse(int Id, string Name, string Hex);
}
