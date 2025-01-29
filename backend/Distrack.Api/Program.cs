using Distrack.Api.Endpoints;
using Distrack.Application;
using Distrack.Infrastructure;
using Distrack.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(
        name: "AllowSpecificOrigin",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod();
        }
    );
});

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration, webRootPath =>
{
    var env = webRootPath.GetRequiredService<IWebHostEnvironment>();
    return env.WebRootPath;
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Create/Migrate DB.
using (var serviceScope = app.Services.GetService<IServiceScopeFactory>().CreateScope())
{
    var context = serviceScope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
}

app.MapCategoryEndpoints();
app.MapCollectibleEndpoints();
app.MapCollectionEndpoints();
app.MapTagEndpoints();

app.UseCors("AllowSpecificOrigin");

app.UseStaticFiles();

app.UseHttpsRedirection();

app.Run();
