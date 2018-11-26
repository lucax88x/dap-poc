using System;
using DAP.Infra.Property;
using DAP.Test.Common;
using Xunit;

namespace DAP.Infra.Test.Ioc
{
    public class ModuleTest : IDisposable
    {
        private readonly ScopeResolver _scopeResolver;

        public ModuleTest()
        {
            _scopeResolver = new ScopeResolver();

            var configBuilder = new ConfigBuilder();

            _scopeResolver.BuildContainer(new Config.Ioc.Module(configBuilder.Build()), new Infra.Ioc.Module());
        }

        [Fact]
        public void should_resolve_IPropertyWriteRepository()
        {
            _scopeResolver.IsSingleInstance<IPropertyWriteRepository, PropertyWriteRepository>();
        }
        
        [Fact]
        public void should_resolve_IPropertyReadRepository()
        {
            _scopeResolver.IsSingleInstance<IPropertyReadRepository, PropertyReadRepository>();
        }

        public void Dispose()
        {
            _scopeResolver.Dispose();
        }
    }
}