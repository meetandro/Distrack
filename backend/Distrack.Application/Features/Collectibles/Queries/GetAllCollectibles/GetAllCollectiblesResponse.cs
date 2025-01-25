using Distrack.Domain.Enums;

namespace Distrack.Application.Features.Collectibles.Queries.GetAllCollectibles
{
    public sealed record GetAllCollectiblesResponse(
        int Id,
        string Name,
        string? Description,
        Color? Color,
        string? Currency,
        decimal? Value,
        Condition? Condition,
        DateTime? AcquiredDate,
        bool? IsPatented,
        int CategoryId,
        int CollectionId,
        List<string> ImageUrls,
        List<int> Tags
    );
}
