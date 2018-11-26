using GraphQL;
using GraphQL.Types;

namespace DAP.Web.Api.GraphQL
{
    public class PropertySchema : Schema
    {
        public PropertySchema(IDependencyResolver resolver)
            : base(resolver)
        {
            Query = resolver.Resolve<PropertyQuery>();
        }
    }
}