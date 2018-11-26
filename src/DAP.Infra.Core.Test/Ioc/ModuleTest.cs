using System;
using DAP.Test.Common;
using FluentAssertions;
using Xunit;

namespace DAP.Infra.Core.Test.Ioc
{
    public class ModuleTest : IDisposable
    {
        private readonly ScopeResolver _scopeResolver;

        public ModuleTest()
        {
            _scopeResolver = new ScopeResolver();

            var configBuilder = new ConfigBuilder();

            _scopeResolver.BuildContainer(new Config.Ioc.Module(configBuilder.Build()), new Infra.Core.Ioc.Module());
        }
        
        [Fact]
        public void should_resolve_IConnectionFactory()
        {
            _scopeResolver.IsSingleInstance<IConnectionFactory, ConnectionFactory>();
        }

        public void Dispose()
        {
            _scopeResolver.Dispose();
        }
    }
}