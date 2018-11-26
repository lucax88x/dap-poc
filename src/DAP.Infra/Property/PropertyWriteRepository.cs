using System;
using System.Threading.Tasks;
using Raven.Client.Documents.Session;

namespace DAP.Infra.Property
{
    public interface IPropertyWriteRepository
    {
        Task<Guid> Save(IAsyncDocumentSession session, Domain.Property property);
    }

    public class PropertyWriteRepository : IPropertyWriteRepository
    {
        public async Task<Guid> Save(IAsyncDocumentSession session, Domain.Property property)
        {
            var dto = new PropertyDto(property.Id.ToString(), property.Address);
            
            await session.StoreAsync(dto);

            return property.Id;
        }
    }
}