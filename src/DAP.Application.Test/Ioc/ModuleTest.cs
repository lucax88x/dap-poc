using System;
using DAP.Application.Property;
using DAP.Application.Protocol;
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
        
        [Fact]
        public void should_resolve_ProtocolService()
        {
            _scopeResolver.IsInstancePerLifetimeScope<ProtocolService>();
        }
        
        [Fact]
        public void should_resolve_ProtocolProjection()
        {
            _scopeResolver.IsInstancePerLifetimeScope<ProtocolProjection>();
        }

        public void Dispose()
        {
            _scopeResolver.Dispose();
        }
    }
}