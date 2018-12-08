using System;
using System.Threading;
using System.Threading.Tasks;
using Raven.Client.Documents;
using Raven.Client.Documents.Linq;
using Raven.Client.Documents.Session;

namespace DAP.Infra.Protocol
{
    public interface IProtocolWriteRepository
    {
        Task<Domain.Protocol> Get(IAsyncDocumentSession session, Guid id,
            CancellationToken cancellationToken = default(CancellationToken));

        Task Save(IAsyncDocumentSession session, Domain.Protocol protocol,
            CancellationToken cancellationToken = default(CancellationToken));

        Task DeleteOthersByPropertyId(IAsyncDocumentSession session, Guid toExcludeId, Guid propertyId,
            CancellationToken cancellationToken = default(CancellationToken));
    }

    public class ProtocolWriteRepository : IProtocolWriteRepository
    {
        public async Task<Domain.Protocol> Get(IAsyncDocumentSession session, Guid id,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            return await session.LoadAsync<Domain.Protocol>(id.ToString(), cancellationToken);
        }

        public async Task Save(IAsyncDocumentSession session, Domain.Protocol protocol,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            await session.StoreAsync(protocol, cancellationToken);
        }

        public async Task DeleteOthersByPropertyId(IAsyncDocumentSession session, Guid toExcludeId, Guid propertyId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            foreach (var protocol in await session.Query<Domain.Protocol>()
                .Where(p => p.Id != toExcludeId.ToString() && p.PropertyId == propertyId.ToString(), false)
                .ToListAsync(cancellationToken))
            {
                session.Delete(protocol);
            }
        }
    }
}