using Distrack.Domain.Enums;

namespace Distrack.Application.Features.Collectibles.Commands.UpdateCollectible
{
    public sealed record UpdateCollectibleResponse(
        string Name,
        string? Description,
        Color? Color,
        string? Currency,
        decimal? Value,
        Condition? Condition,
        DateTime? AcquiredDate,
        bool? IsPatented,
        int CategoryId,
        int CollectionId
    );
}
