using MediatR;

namespace Distrack.Application.Features.Categories.Commands.CreateCategory
{
    public sealed record CreateCategoryCommand(string Name) : IRequest<int>;
}
