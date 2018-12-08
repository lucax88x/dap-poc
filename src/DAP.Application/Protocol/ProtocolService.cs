using System.Threading;
using System.Threading.Tasks;
using DAP.Application.Protocol.Commands;
using DAP.Infra.Core;
using DAP.Infra.Protocol;
using MediatR;

namespace DAP.Application.Protocol
{
    public class ProtocolService :
        IRequestHandler<CreateOrUpdateProtocol, Domain.Protocol>,
        IRequestHandler<CompleteProtocol, Domain.Protocol>
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IProtocolWriteRepository _protocolWriteRepository;

        public ProtocolService(IConnectionFactory connectionFactory, IProtocolWriteRepository protocolWriteRepository)
        {
            _connectionFactory = connectionFactory;
            _protocolWriteRepository = protocolWriteRepository;
        }

        public async Task<Domain.Protocol> Handle(CreateOrUpdateProtocol request, CancellationToken cancellationToken)
        {
            var protocol = new Domain.Protocol(request.Id.ToString(), request.PropertyId.ToString(), request.Note,
                request.Images,
                request.Signature,
                false);

            using (var session = _connectionFactory.Store.OpenAsyncSession())
            {
                await _protocolWriteRepository.DeleteOthersByPropertyId(
                    session,
                    request.Id,
                    request.PropertyId,
                    cancellationToken);

                await _protocolWriteRepository.Save(session, protocol, cancellationToken);

                await session.SaveChangesAsync(cancellationToken);

                return protocol;
            }
        }

        public async Task<Domain.Protocol> Handle(CompleteProtocol request, CancellationToken cancellationToken)
        {
            using (var session = _connectionFactory.Store.OpenAsyncSession())
            {
                var protocol = await _protocolWriteRepository.Get(session, request.Id, cancellationToken);

                protocol.SetCompleted();

                await _protocolWriteRepository.Save(session, protocol, cancellationToken);

                await session.SaveChangesAsync(cancellationToken);

                return protocol;
            }
        }
    }
}