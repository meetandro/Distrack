using Distrack.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Distrack.Application.Features.Collectibles.Commands.CreateCollectible
{
    public sealed record CreateCollectibleCommand(
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
        IFormFileCollection Images
    ) : IRequest<int>;
}
