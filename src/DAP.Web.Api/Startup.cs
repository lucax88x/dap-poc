using Autofac;
using GraphQL.Server;
using GraphQL.Server.Ui.Playground;
using GraphQL.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Events;
using Module = DAP.Web.Api.Ioc.Module;

namespace DAP.Web.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        public IHostingEnvironment Environment { get; }

        public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
            Environment = environment;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            if (Environment.IsDevelopment())
            {
                services.AddCors();
            }

            services.AddGraphQL(options =>
            {
                options.EnableMetrics = true;
                options.ExposeExceptions = Environment.IsDevelopment();
            });
        }

        public void Configure(IApplicationBuilder app)
        {
            if (Environment.IsDevelopment())
            {
                app.UseCors(builder => builder
                    .WithOrigins("http://localhost:3000")
                    .WithHeaders("authorization", "content-type", "cache-control", "pragma", "expires",
                        "if-modified-since")
                    .WithMethods("GET", "POST", "PUT", "PATCH", "DELETE"));
                
                app.UseDeveloperExceptionPage();
            }

            ConfigureLogger();

            app.UseGraphQL<ISchema>();

            if (Environment.IsDevelopment())
            {
                app.UseGraphQLPlayground(new GraphQLPlaygroundOptions
                {
                    Path = "/ui/playground"
                });
            }
        }

        public void ConfigureContainer(ContainerBuilder builder)
        {
            builder.RegisterModule(new Module(Configuration));
        }

        private void ConfigureLogger()
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.RollingFile("logs/api-{Hour}.txt")
                .WriteTo.Console()
                .CreateLogger();
        }
    }
}