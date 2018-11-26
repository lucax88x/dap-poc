using System;
using System.Threading;
using System.Threading.Tasks;
using DAP.Application.Property.Commands;
using MediatR;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace DAP.Bootstrapper
{
    public class BootstrapperHostedService : IHostedService
    {
        private readonly ILogger _logger;
        private readonly IMediator _mediator;

        public BootstrapperHostedService(ILogger logger, IMediator mediator)
        {
            _logger = logger;
            _mediator = mediator;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            _logger.Information("Starting Bootstrapper Service");

            await _mediator.Send(new CreateProperty("Bolligerstrasse 5, Ostermundigen, Villa Frei", Guid.NewGuid()), cancellationToken);
            await _mediator.Send(new CreateProperty("Bernstrasse 11, Ostermundigen, Apartment 2b", Guid.NewGuid()), cancellationToken);
            await _mediator.Send(new CreateProperty("Umfahrungsstrasse 102, Ostermundigen, Apartment 3a", Guid.NewGuid()), cancellationToken);
            await _mediator.Send(new CreateProperty("Laupenstrasse 147, Bern, Büro GARAIO", Guid.NewGuid()), cancellationToken);
            await _mediator.Send(new CreateProperty("Gartenstrasse 1, Bern, Office GARAIO", Guid.NewGuid()), cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.Information("Stopping Bootstrapper Service");

            return Task.CompletedTask;
        }
    }
}