using System.Collections.Immutable;
using DAP.Core.Interfaces;
using DAP.Infra.Property;

namespace DAP.Application.Property.Query
{
    public class GetPropertiesByFilter : Query<ImmutableArray<PropertyDto>>
    {
        public string Filter { get; }

        public GetPropertiesByFilter(string filter)
        {
            Filter = filter;
        }
    }
}