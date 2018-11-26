using System.Collections.Generic;
using Microsoft.Extensions.Configuration;

namespace DAP.Test.Common
{
    public class ConfigBuilder
    {
        private readonly ConfigurationBuilder _configurationBuilder;

        public ConfigBuilder()
        {
            _configurationBuilder = new ConfigurationBuilder();

            var defaultConfig = new Dictionary<string, string>
            {
                {"Raven:Address", "http://localhost:8080"},
                {"Raven:Database", "DAP"}
            };

            Add(defaultConfig);

            _configurationBuilder.AddEnvironmentVariables("DAP_");
        }

        public ConfigBuilder Add(Dictionary<string, string> settings)
        {
            _configurationBuilder.AddInMemoryCollection(settings);
            return this;
        }

        public IConfiguration Build()
        {
            return _configurationBuilder.Build();
        }

        public Autofac.Module BuildModule()
        {
            return new Config.Ioc.Module(Build());
        }
    }
}