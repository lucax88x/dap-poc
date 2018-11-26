using System.Linq;
using Castle.DynamicProxy;
using Serilog;

namespace DAP.Application.Interceptors
{
    public class MediatorInterceptor : IInterceptor
    {
        private readonly ILogger _logger;

        public MediatorInterceptor(ILogger logger)
        {
            _logger = logger;
        }

        public void Intercept(IInvocation invocation)
        {
            var argument = invocation.Arguments.Select(a => (a ?? "").ToString()).ToArray().FirstOrDefault();

            string resp = null;
            if (argument != null)
            {
                resp = argument.Split('.').Last();
            }

            // TODO log times and catch errors?
            if (!string.IsNullOrEmpty(resp))
            {
                _logger.Information($"Handling {resp}");
            }

            invocation.Proceed();

            if (!string.IsNullOrEmpty(resp))
            {
                _logger.Information($"Handled {resp}");
            }
        }
    }
}