using Distrack.Application.Features.Collectibles.Commands.AddTagsToCollectible;
using Distrack.Application.Features.Collectibles.Commands.CreateCollectible;
using Distrack.Application.Features.Collectibles.Commands.DeleteCollectible;
using Distrack.Application.Features.Collectibles.Commands.UpdateCollectible;
using Distrack.Application.Features.Collectibles.Queries.GetCollectibleById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Distrack.Api.Endpoints;

public static class CollectibleEndpoints
{
    public static void MapCollectibleEndpoints(this WebApplication app)
    {
        var root = app.MapGroup("/api/collectibles");

        root.MapGet("/{id}", GetCollectibleById);

        root.MapPost("", CreateCollectible).DisableAntiforgery();

        root.MapPut("/{id}", UpdateCollectible).DisableAntiforgery();

        root.MapDelete("/{id}", DeleteCollectible);

        root.MapPost("/{id}/tags", AddTagsToCollectible);
    }

    public static async Task<IResult> GetCollectibleById(int id, IMediator mediator)
    {
        var query = new GetCollectibleByIdQuery(id);
        var result = await mediator.Send(query);
        return result is not null ? Results.Ok(result) : Results.NotFound();
    }

    public static async Task<IResult> CreateCollectible(
        [FromForm] CreateCollectibleCommand command,
        IMediator mediator
    )
    {
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }

    public static async Task<IResult> UpdateCollectible(
        [FromForm] UpdateCollectibleCommand command,
        IMediator mediator
    )
    {
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }

    public static async Task<IResult> DeleteCollectible(int id, IMediator mediator)
    {
        var command = new DeleteCollectibleCommand(id);
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }

    public static async Task<IResult> AddTagsToCollectible(
        AddTagsToCollectibleCommand command,
        IMediator mediator
    )
    {
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }
}
