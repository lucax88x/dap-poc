using Autofac;
using Microsoft.Extensions.Configuration;

namespace DAP.Config.Ioc
{
    public class Module : Autofac.Module
    {
        private readonly IConfiguration _configuration;

        public Module(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        protected override void Load(ContainerBuilder builder)
        {            
            builder.Register(c =>
                    new Raven
                    {
                        Address = _configuration.GetSection("Raven:Address").Value,
                        Database = _configuration.GetSection("Raven:Database").Value
                    })
                .SingleInstance();
        }
    }
}