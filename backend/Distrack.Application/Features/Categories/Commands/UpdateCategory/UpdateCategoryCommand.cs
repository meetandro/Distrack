using MediatR;

namespace Distrack.Application.Features.Categories.Commands.UpdateCategory
{
    public sealed record UpdateCategoryCommand(int Id, string Name)
        : IRequest<UpdateCategoryResponse>;
}
