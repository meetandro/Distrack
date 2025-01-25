using Distrack.Application.Features.Categories.Commands.CreateCategory;
using Distrack.Application.Features.Categories.Commands.DeleteCategory;
using Distrack.Application.Features.Categories.Commands.UpdateCategory;
using Distrack.Application.Features.Categories.Queries.GetAllCategories;
using Distrack.Application.Features.Categories.Queries.GetCategoryById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Distrack.Api.Endpoints;

public static class CategoryEndpoints
{
    public static void MapCategoryEndpoints(this WebApplication app)
    {
        var root = app.MapGroup("/api/categories");

        root.MapGet("", GetCategories);

        root.MapGet("/{id}", GetCategoryById);

        root.MapPost("", CreateCategory);

        root.MapPut("/{id}", UpdateCategory);

        root.MapDelete("/{id}", DeleteCategory);
    }

    public static async Task<IResult> GetCategories(IMediator mediator)
    {
        var query = new GetAllCategoriesQuery();
        var result = await mediator.Send(query);
        return Results.Ok(result);
    }

    public static async Task<IResult> GetCategoryById(int id, IMediator mediator)
    {
        var query = new GetCategoryByIdQuery(id);
        var result = await mediator.Send(query);
        return result is not null ? Results.Ok(result) : Results.NotFound();
    }

    public static async Task<IResult> CreateCategory(
        [FromBody] CreateCategoryCommand command,
        IMediator mediator
    )
    {
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }

    public static async Task<IResult> UpdateCategory(
        [FromBody] UpdateCategoryCommand command,
        IMediator mediator
    )
    {
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }

    public static async Task<IResult> DeleteCategory(int id, IMediator mediator)
    {
        var command = new DeleteCategoryCommand(id);
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }
}
