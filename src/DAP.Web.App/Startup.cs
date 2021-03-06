﻿using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Serilog;
using Serilog.Events;

namespace DAP.Web.App
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            ConfigureLogger();

            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404 && !System.IO.Path.HasExtension(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseFileServer(new FileServerOptions
            {
                StaticFileOptions =
                {
                    OnPrepareResponse = ctx =>
                    {
                        if (ctx.File.Name == "service-worker.js")
                        {
                            ctx.Context.Response.Headers.Append("Cache-Control", "no-cache, no-store, must-revalidate");
                        }
                        else
                        {
                            ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=86400");
                        }
                    }
                }
            });
        }

        private void ConfigureLogger()
        {
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
                .Enrich.FromLogContext()
                .WriteTo.RollingFile("logs/app-{Hour}.txt")
                .WriteTo.Console()
                .CreateLogger();
        }
    }
}