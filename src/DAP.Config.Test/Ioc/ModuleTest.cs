using System;
using DAP.Config.Ioc;
using DAP.Test.Common;
using FluentAssertions;
using Xunit;

namespace DAP.Config.Test.Ioc
{
    public class ModuleTest : IDisposable
    {
        private readonly ScopeResolver _scopeResolver;

        public ModuleTest()
        {
            _scopeResolver = new ScopeResolver();

            var configBuilder = new ConfigBuilder();

            _scopeResolver.BuildContainer(new Module(configBuilder.Build()));
        }

        [Fact]
        public void should_resolve_Raven()
        {
            _scopeResolver.IsSingleInstance<Raven>();
            _scopeResolver.Resolve<Raven>().Database.Should().Be("DAP");
            _scopeResolver.Resolve<Raven>().Address.Should().Be("http://localhost:8080");
        }

        public void Dispose()
        {
            _scopeResolver.Dispose();
        }
    }
}