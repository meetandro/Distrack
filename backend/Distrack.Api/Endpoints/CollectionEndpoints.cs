using Distrack.Application.Features.Collections.Commands.CreateCollection;
using Distrack.Application.Features.Collections.Commands.DeleteCollection;
using Distrack.Application.Features.Collections.Commands.UpdateCollection;
using Distrack.Application.Features.Collections.Queries.GetAllCollections;
using Distrack.Application.Features.Collections.Queries.GetCollectiblesForCollection;
using Distrack.Application.Features.Collections.Queries.GetCollectionById;
using Distrack.Application.Features.Collections.Queries.GetTagsForCollection;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Distrack.Api.Endpoints;

public static class CollectionEndpoints
{
    public static void MapCollectionEndpoints(this WebApplication app)
    {
        var root = app.MapGroup("/api/collections");

        root.MapGet("/{id}/collectibles", GetCollectiblesForCollection);

        root.MapGet("/{id}/tags", GetTagsForCollection);

        root.MapGet("", GetCollections);

        root.MapGet("/{id}", GetCollectionById);

        root.MapPost("", CreateCollection);

        root.MapPut("/{id}", UpdateCollection);

        root.MapDelete("/{id}", DeleteCollection);
    }

    public static async Task<IResult> GetCollectiblesForCollection(
        int id,
        int page,
        int pageSize,
        string? searchQuery,
        string? colors,
        string? currency,
        decimal? minValue,
        decimal? maxValue,
        string? conditions,
        DateTime? acquiredFrom,
        DateTime? acquiredTo,
        bool? isPatented,
        string? sortBy,
        string? sortOrder,
        IMediator mediator
    )
    {
        var query = new GetCollectiblesForCollectionQuery(
            id,
            page,
            pageSize,
            searchQuery,
            colors,
            currency,
            minValue,
            maxValue,
            conditions,
            acquiredFrom,
            acquiredTo,
            isPatented,
            sortBy,
            sortOrder
        );
        var result = await mediator.Send(query);
        return Results.Ok(result);
    }

    public static async Task<IResult> GetTagsForCollection(int id, IMediator mediator)
    {
        var query = new GetTagsForCollectionQuery(id);
        var result = await mediator.Send(query);
        return Results.Ok(result);
    }

    public static async Task<IResult> GetCollections(IMediator mediator)
    {
        var query = new GetAllCollectionsQuery();
        var result = await mediator.Send(query);
        return Results.Ok(result);
    }

    public static async Task<IResult> GetCollectionById(int id, IMediator mediator)
    {
        var query = new GetCollectionByIdQuery(id);
        var result = await mediator.Send(query);
        return result is not null ? Results.Ok(result) : Results.NotFound();
    }

    public static async Task<IResult> CreateCollection(
        [FromBody] CreateCollectionCommand command,
        IMediator mediator
    )
    {
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }

    public static async Task<IResult> UpdateCollection(
        [FromBody] UpdateCollectionCommand command,
        IMediator mediator
    )
    {
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }

    public static async Task<IResult> DeleteCollection(int id, IMediator mediator)
    {
        var command = new DeleteCollectionCommand(id);
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }
}
