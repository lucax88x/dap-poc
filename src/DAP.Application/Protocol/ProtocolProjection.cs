using System.Threading;
using System.Threading.Tasks;
using DAP.Application.Protocol.Query;
using DAP.Infra.Core;
using DAP.Infra.Protocol;
using MediatR;

namespace DAP.Application.Protocol
{
    public class ProtocolProjection :
        IRequestHandler<GetProtocolByPropertyId, Domain.Protocol>
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IProtocolReadRepository _protocolReadRepository;

        public ProtocolProjection(IConnectionFactory connectionFactory, IProtocolReadRepository protocolReadRepository)
        {
            _connectionFactory = connectionFactory;
            _protocolReadRepository = protocolReadRepository;
        }

        public async Task<Domain.Protocol> Handle(GetProtocolByPropertyId request, CancellationToken cancellationToken)
        {
            using (var session = _connectionFactory.Store.OpenAsyncSession())
                return await _protocolReadRepository.GetByPropertyId(session, request.PropertyId, cancellationToken);
        }
    }
}