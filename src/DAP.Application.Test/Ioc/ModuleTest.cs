using System;
using DAP.Application.Property;
using DAP.Config.Ioc;
using DAP.Test.Common;
using Xunit;

namespace DAP.Application.Test.Ioc
{
    public class ModuleTest : IDisposable
    {
        private readonly ScopeResolver _scopeResolver;

        public ModuleTest()
        {
            _scopeResolver = new ScopeResolver();

            var configBuilder = new ConfigBuilder();

            _scopeResolver.BuildContainer(new Module(configBuilder.Build()), new Application.Ioc.Module());
        }
        
        [Fact]
        public void should_resolve_PropertyService()
        {
            _scopeResolver.IsInstancePerLifetimeScope<PropertyService>();
        }
        
        [Fact]
        public void should_resolve_PropertyProjection()
        {
            _scopeResolver.IsInstancePerLifetimeScope<PropertyProjection>();
        }

        public void Dispose()
        {
            _scopeResolver.Dispose();
        }
    }
}