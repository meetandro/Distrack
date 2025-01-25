namespace Distrack.Application.Features.Collections.Queries.GetAllCollections
{
    internal sealed record GetAllCollectionsResponse(
        int Id,
        string Name,
        string? Description,
        DateTime CreatedDate,
        List<int> Collectibles
    );
}
