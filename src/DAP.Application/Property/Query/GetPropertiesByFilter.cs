using System.Collections.Immutable;
using DAP.Core.Interfaces;

namespace DAP.Application.Property.Query
{
    public class GetPropertiesByFilter : Query<ImmutableArray<Domain.Property>>
    {
        public string Filter { get; }

        public GetPropertiesByFilter(string filter)
        {
            Filter = filter;
        }
    }
}