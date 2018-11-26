using System;
using System.Threading.Tasks;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using Serilog.Events;

namespace DAP.Bootstrapper
{
    class Program
    {
        private static IConfigurationRoot _configuration;
        static async Task<int> Main(string[] args)
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.RollingFile("logs/bootstrapper-{Hour}.txt")
                .WriteTo.Console()
                .CreateLogger();
            try
            {
                var hostBuilder = new HostBuilder()
                    .UseServiceProviderFactory(new AutofacServiceProviderFactory())
                    .ConfigureAppConfiguration((hostingContext, config) =>
                    {
                        _configuration = config
                            .AddEnvironmentVariables("DAP_")
                            .Build();
                    })
                    .ConfigureContainer((ContainerBuilder builder) =>
                    {
                        builder.RegisterModule(new Config.Ioc.Module(_configuration));
                        builder.RegisterModule(new Application.Ioc.Module());
                    })
                    .ConfigureServices((hostContext, services) =>
                    {
                        services.AddAutofac();
                        services.AddSingleton<IHostedService, BootstrapperHostedService>();
                    });

                await hostBuilder.RunConsoleAsync();

                return 0;
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Email Consumer Host terminated unexpectedly");
                return 1;
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }
    }
}