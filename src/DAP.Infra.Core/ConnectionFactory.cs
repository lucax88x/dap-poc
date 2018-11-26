using System;
using Raven.Client.Documents;
using Raven.Client.Documents.Operations;
using Raven.Client.Exceptions.Database;
using Raven.Client.ServerWide;
using Raven.Client.ServerWide.Operations;

namespace DAP.Infra.Core
{
    public interface IConnectionFactory
    {
        IDocumentStore Store { get; }
    }

    public class ConnectionFactory : IDisposable, IConnectionFactory
    {
        private readonly Config.Raven _raven;
        private IDocumentStore _store;

        public ConnectionFactory(Config.Raven raven)
        {
            _raven = raven;
        }

        public IDocumentStore Store
        {
            get
            {
                if (_store == null)
                {
                    var urls = new[] {_raven.Address};
                    _store = new DocumentStore {Urls = urls, Database = _raven.Database}.Initialize();

                    EnsureDatabaseExists();
                }

                return _store;
            }
        }

        private void EnsureDatabaseExists()
        {
            try
            {
                Store.Maintenance.ForDatabase(_store.Database).Send(new GetStatisticsOperation());
            }
            catch (DatabaseDoesNotExistException)
            {
                Store.Maintenance.Server.Send(new CreateDatabaseOperation(new DatabaseRecord(_store.Database)));
            }
        }

        public void Dispose()
        {
            _store?.Dispose();
        }
    }
}