using Distrack.Application.Contracts.Persistence;
using Distrack.Domain.Entities;
using MediatR;

namespace Distrack.Application.Features.Collections.Commands.CreateCollection
{
    internal class CreateCollectionCommandHandler(ICollectionRepository collectionRepository)
        : IRequestHandler<CreateCollectionCommand, int>
    {
        public async Task<int> Handle(
            CreateCollectionCommand request,
            CancellationToken cancellationToken
        )
        {
            var collection = new Collection
            {
                Name = request.Name,
                Description = request.Description,
                CreatedDate = DateTime.UtcNow,
            };

            var result = await collectionRepository.CreateAsync(collection);

            return result.Id;
        }
    }
}
