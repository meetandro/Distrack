namespace Distrack.Application.Features.Collections.Queries.GetCollectionById
{
    public sealed record GetCollectionByIdResponse(
        int Id,
        string Name,
        string? Description,
        DateTime CreatedDate,
        List<int> Collectibles
    );
}
