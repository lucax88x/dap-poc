using System;
using System.Collections.Immutable;
using System.Threading;
using System.Threading.Tasks;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;

namespace DAP.Infra.Property
{
    public interface IPropertyReadRepository
    {
        Task<Domain.Property> Get(IAsyncDocumentSession session, Guid id,
            CancellationToken cancellationToken = default(CancellationToken));

        Task<ImmutableArray<Domain.Property>> Get(IAsyncDocumentSession session, string filter,
            CancellationToken cancellationToken = default(CancellationToken));
    }

    public class PropertyReadRepository : IPropertyReadRepository
    {
        public async Task<Domain.Property> Get(IAsyncDocumentSession session, Guid id,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            return await session.LoadAsync<Domain.Property>(id.ToString(), cancellationToken);
        }

        public async Task<ImmutableArray<Domain.Property>> Get(IAsyncDocumentSession session, string filter,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            var list = await session.Query<Domain.Property>()
                .Search(p => p.Address, $"*{filter}*")
                .ToListAsync(cancellationToken);

            return list.ToImmutableArray();
        }
    }
}