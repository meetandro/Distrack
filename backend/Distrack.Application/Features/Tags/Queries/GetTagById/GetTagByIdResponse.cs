namespace Distrack.Application.Features.Tags.Queries.GetTagById
{
    public sealed record GetTagByIdResponse(
        int Id,
        string Name,
        string Hex,
        int CollectionId,
        List<int> Collectibles
    );
}

