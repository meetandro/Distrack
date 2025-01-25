namespace Distrack.Application.Features.Categories.Queries.GetCategoryById
{
    internal sealed record GetCategoryByIdResponse(int Id, string Name, List<int> Collectibles);
}
