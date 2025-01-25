using Microsoft.AspNetCore.Http;

namespace Distrack.Application.Contracts.Persistence
{
    public interface IFileService
    {
        Task<string> SaveFileInFolderAsync(IFormFile file, string folder);

        Task<List<string>> SaveFilesInFolderAsync(IFormFileCollection files, string folder);

        public void DeleteFileInFolder(string fileName, string folder);
    }
}
