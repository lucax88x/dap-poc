using System;
using System.Threading;
using System.Threading.Tasks;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;

namespace DAP.Infra.Protocol
{
    public interface IProtocolReadRepository
    {
        Task<Domain.Protocol> GetByPropertyId(IAsyncDocumentSession session, Guid propertyId,
            CancellationToken cancellationToken = default(CancellationToken));
    }

    public class ProtocolReadRepository : IProtocolReadRepository
    {
        public async Task<Domain.Protocol> GetByPropertyId(IAsyncDocumentSession session, Guid propertyId,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            return await session.Query<Domain.Protocol>().Where(p => p.PropertyId == propertyId.ToString(), false)
                .FirstAsync(cancellationToken);
        }
    }
}