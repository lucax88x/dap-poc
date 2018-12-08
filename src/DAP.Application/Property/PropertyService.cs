using System.Threading;
using System.Threading.Tasks;
using DAP.Application.Property.Commands;
using DAP.Infra.Core;
using DAP.Infra.Property;
using MediatR;

namespace DAP.Application.Property
{
    public class PropertyService : IRequestHandler<CreateProperty, Domain.Property>
    {
        private readonly IConnectionFactory _connectionFactory;
        private readonly IPropertyWriteRepository _propertyWriteRepository;

        public PropertyService(IConnectionFactory connectionFactory, IPropertyWriteRepository propertyWriteRepository)
        {
            _connectionFactory = connectionFactory;
            _propertyWriteRepository = propertyWriteRepository;
        }

        public async Task<Domain.Property> Handle(CreateProperty request, CancellationToken cancellationToken)
        {
            var property = new Domain.Property(request.Id.ToString(), request.Address);

            using (var session = _connectionFactory.Store.OpenAsyncSession())
            {
                await _propertyWriteRepository.Save(session, property);

                await session.SaveChangesAsync(cancellationToken);

                return property;
            }
        }
    }
}