using Distrack.Application.Contracts.Persistence;
using Distrack.Infrastructure.Persistence;
using Distrack.Infrastructure.Persistence.Repositories;
using Distrack.Infrastructure.Persistence.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Distrack.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(
            this IServiceCollection services,
            IConfiguration configuration,
            Func<IServiceProvider, string> webRootPath
        )
        {
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<ICollectibleRepository, CollectibleRepository>();
            services.AddScoped<ICollectionRepository, CollectionRepository>();
            services.AddScoped<IFileService, FileService>(provider =>
            {
                var path = webRootPath(provider);
                return new FileService(path);
            });
            services.AddScoped<IImageRepository, ImageRepository>();
            services.AddScoped<ITagRepository, TagRepository>();

            services.AddDbContext<ApplicationDbContext>(options =>
            {
                var connectionString = configuration.GetConnectionString("ApplicationDbContext");
                options.UseSqlite(connectionString);
            });

            return services;
        }
    }
}
