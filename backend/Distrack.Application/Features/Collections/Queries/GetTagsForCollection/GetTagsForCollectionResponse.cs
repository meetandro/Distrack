namespace Distrack.Application.Features.Collections.Queries.GetTagsForCollection
{
    public sealed record GetTagsForCollectionResponse(
        int Id,
        string Name,
        string Hex,
        int CollectionId,
        IEnumerable<int> CollectibleIds
    );
}

