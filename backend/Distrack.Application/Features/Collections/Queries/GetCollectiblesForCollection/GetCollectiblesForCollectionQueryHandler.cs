using System.Linq.Expressions;
using Distrack.Application.Contracts.Persistence;
using Distrack.Application.Models;
using Distrack.Domain.Entities;
using Distrack.Domain.Enums;
using MediatR;

namespace Distrack.Application.Features.Collections.Queries.GetCollectiblesForCollection
{
    internal class GetCollectiblesForCollectionQueryHandler(
        ICollectionRepository collectionRepository
    )
        : IRequestHandler<
            GetCollectiblesForCollectionQuery,
            PaginatedList<GetCollectiblesForCollectionQueryResponse>
        >
    {
        public async Task<PaginatedList<GetCollectiblesForCollectionQueryResponse>> Handle(
            GetCollectiblesForCollectionQuery request,
            CancellationToken cancellationToken
        )
        {
            var collectibles = await collectionRepository.GetCollectiblesForCollectionAsync(
                request.Id
            );

            if (!string.IsNullOrEmpty(request.Query))
            {
                collectibles = collectibles.Where(c =>
                    c.Name.Contains(request.Query.ToLower(), StringComparison.CurrentCultureIgnoreCase)
                    || (
                        c.Description != null
                        && c.Description.Contains(
                            request.Query.ToLower(),
                            StringComparison.CurrentCultureIgnoreCase
                        )
                    )
                );
            }

            List<Color>? colorsList = null;
            if (request.Colors is not null)
            {
                colorsList = request.Colors
                    .Split(',')
                    .Select(color =>
                        Enum.TryParse<Color>(color, true, out var parsedColor)
                            ? parsedColor
                            : (Color?)null
                    )
                    .Where(c => c.HasValue)
                    .Select(c => c.Value)
                    .ToList();
            }
            if (colorsList is not null && colorsList.Count != 0)
            {
                collectibles = collectibles.Where(c =>
                    c.Color != null && colorsList.Contains(c.Color.Value)
                );
            }

            if (!string.IsNullOrEmpty(request.Currency))
            {
                collectibles = collectibles.Where(c =>
                    c.Currency != null
                    && c.Currency.Contains(request.Currency.ToLower(), StringComparison.CurrentCultureIgnoreCase)
                );
            }

            if (request.MinValue is not null)
            {
                collectibles = collectibles.Where(c =>
                    c.Value != null && c.Value >= request.MinValue
                );
            }

            if (request.MaxValue is not null)
            {
                collectibles = collectibles.Where(c =>
                    c.Value != null && c.Value <= request.MaxValue
                );
            }

            List<Condition>? conditionsList = null;
            if (request.Conditions is not null)
            {
                conditionsList = request.Conditions
                    .Split(',')
                    .Select(cond =>
                        Enum.TryParse<Condition>(cond, true, out var parsedCondition)
                            ? parsedCondition
                            : (Condition?)null
                    )
                    .Where(c => c.HasValue)
                    .Select(c => c.Value)
                    .ToList();
            }
            if (conditionsList is not null && conditionsList.Count != 0)
            {
                collectibles = collectibles.Where(c =>
                    c.Condition != null && conditionsList.Contains(c.Condition.Value)
                );
            }

            if (request.AcquiredFrom is not null)
            {
                collectibles = collectibles.Where(c =>
                    c.AcquiredDate != null && c.AcquiredDate >= request.AcquiredFrom
                );
            }

            if (request.AcquiredTo is not null)
            {
                collectibles = collectibles.Where(c =>
                    c.AcquiredDate != null && c.AcquiredDate <= request.AcquiredTo
                );
            }

            if (request.IsPatented is not null)
            {
                collectibles = collectibles.Where(c =>
                    c.IsPatented != null && c.IsPatented == request.IsPatented
                );
            }

            Expression<Func<Collectible, object>> keySelector = request.SortBy?.ToLower() switch
            {
                "name" => collectible => collectible.Name,
                "description" => collectible => collectible.Description,
                "color" => collectible => collectible.Color.Value,
                "currency" => collectible => collectible.Currency,
                "value" => collectible => collectible.Value,
                "condition" => collectible => collectible.Condition.Value,
                "acquireddate" => collectible => collectible.AcquiredDate,
                _ => collectible => collectible.Id,
            };

            if (request.SortOrder == "desc")
            {
                collectibles = collectibles.OrderByDescending(keySelector);
            }
            else if (request.SortOrder == "asc")
            {
                collectibles = collectibles.OrderBy(keySelector);
            }

            var count = collectibles.Count();

            var pagedCollectibles = collectibles
                .Skip((request.Page - 1) * request.PageSize)
                .Take(request.PageSize)
                .ToList();

            var collectibleResponse = pagedCollectibles.Select(
                c => new GetCollectiblesForCollectionQueryResponse(
                    c.Id,
                    c.Name,
                    c.Description,
                    c.Color,
                    c.Currency,
                    c.Value,
                    c.Condition,
                    c.AcquiredDate,
                    c.IsPatented,
                    c.Images.Select(i => i.Url).ToList(),
                    c.CollectibleTags.Select(ct => new TagResponse(
                        ct.Tag.Id,
                        ct.Tag.Name,
                        ct.Tag.Hex
                    ))
                )
            );

            return new PaginatedList<GetCollectiblesForCollectionQueryResponse>(
                collectibleResponse,
                count,
                request.Page,
                request.PageSize
            );
        }
    }
}
