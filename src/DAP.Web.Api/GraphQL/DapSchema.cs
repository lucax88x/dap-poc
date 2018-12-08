using GraphQL;
using GraphQL.Types;

namespace DAP.Web.Api.GraphQL
{
    public class DapSchema : Schema
    {
        public DapSchema(IDependencyResolver resolver)
            : base(resolver)
        {
            Query = resolver.Resolve<DapQuery>();
            Mutation = resolver.Resolve<DapMutation>();
        }
    }
}