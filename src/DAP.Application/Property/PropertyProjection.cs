using System.Collections.Immutable;
using System.Threading;
using System.Threading.Tasks;
using DAP.Application.Property.Query;
using DAP.Infra.Core;
using DAP.Infra.Property;
using MediatR;

namespace DAP.Application.Property
{
    public class PropertyProjection :
        IRequestHandler<GetProperty, Domain.Property>,
        IRequestHandler<GetPropertiesByFilter, ImmutableArray<Domain.Property>>
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IPropertyReadRepository _propertyReadRepository;

        public PropertyProjection(IConnectionFactory connectionFactory, IPropertyReadRepository propertyReadRepository)
        {
            _connectionFactory = connectionFactory;
            _propertyReadRepository = propertyReadRepository;
        }

        public async Task<Domain.Property> Handle(GetProperty request, CancellationToken cancellationToken)
        {
            using (var session = _connectionFactory.Store.OpenAsyncSession())
                return await _propertyReadRepository.Get(session, request.Id, cancellationToken);
        }

        public async Task<ImmutableArray<Domain.Property>> Handle(GetPropertiesByFilter request,
            CancellationToken cancellationToken)
        {
            using (var session = _connectionFactory.Store.OpenAsyncSession())
                return await _propertyReadRepository.Get(session, request.Filter, cancellationToken);
        }
    }
}