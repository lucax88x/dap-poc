using System;
using FluentAssertions;
using Xunit;

namespace DAP.Infra.Core.Test
{
    public class DbSessionTest
    {
        private readonly IConnectionFactory _sut;

        public DbSessionTest()
        {
            _sut = new ConnectionFactory(new Config.Raven {Address = "http://localhost:8080", Database = "DAP"});
        }

        [Fact]
        public void should_connect_to_database()
        {
            Action act = () => _sut.Store.OpenSession().Load<object>("someid");

            act.Should().NotThrow<Exception>();
        }
    }
}