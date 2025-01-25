using Distrack.Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Distrack.Application.Features.Collectibles.Commands.UpdateCollectible
{
    public sealed record UpdateCollectibleCommand(
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
        List<string>? ExistingImages,
        IFormFileCollection? NewImages
    ) : IRequest<UpdateCollectibleResponse>;
}
