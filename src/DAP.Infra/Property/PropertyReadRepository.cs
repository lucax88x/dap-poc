using System.Collections.Immutable;
using System.Threading.Tasks;
using Raven.Client.Documents;
using Raven.Client.Documents.Session;

namespace DAP.Infra.Property
{
    public interface IPropertyReadRepository
    {
        Task<ImmutableArray<PropertyDto>> Get(IAsyncDocumentSession session, string filter);
    }

    public class PropertyReadRepository : IPropertyReadRepository
    {
        public async Task<ImmutableArray<PropertyDto>> Get(IAsyncDocumentSession session, string filter)
        {
            var list = await session.Query<PropertyDto>()
                .Search(p => p.Address, $"*{filter}*")
                .ToListAsync();

            return list.ToImmutableArray();
        }
    }
}