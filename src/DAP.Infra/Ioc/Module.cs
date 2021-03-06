﻿using Autofac;
using DAP.Infra.Property;
using DAP.Infra.Protocol;

namespace DAP.Infra.Ioc
{
    public class Module : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterModule(new Core.Ioc.Module());
            
            builder.RegisterType<PropertyWriteRepository>()
                .As<IPropertyWriteRepository>()
                .SingleInstance();
            
            builder.RegisterType<PropertyReadRepository>()
                .As<IPropertyReadRepository>()
                .SingleInstance();
            
            builder.RegisterType<ProtocolWriteRepository>()
                .As<IProtocolWriteRepository>()
                .SingleInstance();
            
            builder.RegisterType<ProtocolReadRepository>()
                .As<IProtocolReadRepository>()
                .SingleInstance();
        }
    }
}