using Distrack.Application.Contracts.Persistence;
using MediatR;

namespace Distrack.Application.Features.Collections.Commands.UpdateCollection
{
    internal class UpdateCollectionCommandHandler(ICollectionRepository collectionRepository)
        : IRequestHandler<UpdateCollectionCommand, UpdateCollectionResponse>
    {
        public async Task<UpdateCollectionResponse> Handle(
            UpdateCollectionCommand request,
            CancellationToken cancellationToken
        )
        {
            var collection = await collectionRepository.GetByIdAsync(request.Id);

            collection.Name = request.Name;
            collection.Description = request.Description;

            var result = await collectionRepository.UpdateAsync(collection);

            return new UpdateCollectionResponse(result.Name, result.Description);
        }
    }
}
