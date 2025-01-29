using Distrack.Application.Contracts.Persistence;
using Microsoft.AspNetCore.Http;

namespace Distrack.Infrastructure.Persistence.Services
{
    internal class FileService(string root) : IFileService
    {
        public async Task<string> SaveFileInFolderAsync(IFormFile file, string folder)
        {
            string fileExtension = Path.GetExtension(file.FileName);
            string fileName = $"{Guid.NewGuid()}{fileExtension}";

            string folderPath = Path.Combine("wwwroot", folder);
            Directory.CreateDirectory(folderPath);

            string fullPath = Path.Combine(folderPath, fileName);
            using (var stream = File.Create(fullPath))
            {
                await file.CopyToAsync(stream);
            }

            return fileName;
        }

        public void DeleteFileInFolder(string fileName, string folder)
        {
            string fullPath = root + fileName;
            if (File.Exists(fullPath))
            {
                File.Delete(fullPath);
            }
        }
    }
}
