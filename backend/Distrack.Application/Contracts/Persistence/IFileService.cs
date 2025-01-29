using Microsoft.AspNetCore.Http;

namespace Distrack.Application.Contracts.Persistence
{
    public interface IFileService
    {
        Task<string> SaveFileInFolderAsync(IFormFile file, string folder);

        public void DeleteFileInFolder(string fileName, string folder);
    }
}
