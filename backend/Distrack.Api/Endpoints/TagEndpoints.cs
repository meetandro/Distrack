﻿using Distrack.Application.Features.Tags.Commands.CreateTag;
using Distrack.Application.Features.Tags.Commands.DeleteTag;
using Distrack.Application.Features.Tags.Commands.UpdateTag;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Distrack.Api.Endpoints;

public static class TagEndpoints
{
    public static void MapTagEndpoints(this WebApplication app)
    {
        var root = app.MapGroup("/api/tags");

        root.MapPost("", CreateTag);

        root.MapPut("/{id}", UpdateTag);

        root.MapDelete("/{id}", DeleteTag);
    }

    public static async Task<IResult> CreateTag(
        [FromBody] CreateTagCommand command,
        IMediator mediator
    )
    {
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }

    public static async Task<IResult> UpdateTag(
        [FromBody] UpdateTagCommand command,
        IMediator mediator
    )
    {
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }

    public static async Task<IResult> DeleteTag(int id, IMediator mediator)
    {
        var command = new DeleteTagCommand(id);
        var result = await mediator.Send(command);
        return Results.Ok(result);
    }
}
