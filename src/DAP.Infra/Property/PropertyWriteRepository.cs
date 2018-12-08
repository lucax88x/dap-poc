using System.Threading.Tasks;
using Raven.Client.Documents.Session;

namespace DAP.Infra.Property
{
    public interface IPropertyWriteRepository
    {
        Task Save(IAsyncDocumentSession session, Domain.Property property);
    }

    public class PropertyWriteRepository : IPropertyWriteRepository
    {
        public async Task Save(IAsyncDocumentSession session, Domain.Property property)
        {
            await session.StoreAsync(property);
        }
    }
}