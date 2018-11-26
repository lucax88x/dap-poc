using DAP.Application.Property.Query;
using DAP.Web.Api.GraphQL.Types;
using GraphQL.Types;
using MediatR;

namespace DAP.Web.Api.GraphQL
{
    public class PropertyQuery : ObjectGraphType
    {
        public PropertyQuery(IMediator mediator)
        {
            Name = nameof(PropertyQuery);

            FieldAsync<ListGraphType<PropertyType>>(
                "Properties",
                "The available properties",
                new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                        {Name = "filter", Description = "filter"}
                ),
                async context => await mediator.Send(new GetPropertiesByFilter(context.GetArgument<string>("filter"))));
        }
    }
}