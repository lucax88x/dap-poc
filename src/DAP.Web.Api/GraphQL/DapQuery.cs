using System;
using DAP.Application.Property.Query;
using DAP.Application.Protocol.Query;
using DAP.Web.Api.GraphQL.Property;
using DAP.Web.Api.GraphQL.Protocol;
using GraphQL.Types;
using MediatR;

namespace DAP.Web.Api.GraphQL
{
    public class DapQuery : ObjectGraphType
    {
        private readonly IMediator _mediator;

        public DapQuery(IMediator mediator)
        {
            _mediator = mediator;
            Name = nameof(DapQuery);

            SetPropertyQuery();
            SetProtocolQuery();
        }

        private void SetPropertyQuery()
        {
            FieldAsync<PropertyType>(
                "Property",
                "Property by id",
                new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                        {Name = "id", Description = "id"}
                ),
                async context => await _mediator.Send(new GetProperty(context.GetArgument<Guid>("id"))));

            FieldAsync<ListGraphType<PropertyType>>(
                "Properties",
                "The available properties",
                new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                        {Name = "filter", Description = "filter"}
                ),
                async context => await _mediator.Send(new GetPropertiesByFilter(context.GetArgument<string>("filter"))));
        }

        private void SetProtocolQuery()
        {
            FieldAsync<ProtocolType>(
                "Protocol",
                "Protocol by Property id",
                new QueryArguments(
                    new QueryArgument<NonNullGraphType<StringGraphType>>
                        {Name = "propertyId", Description = "propertyId"}
                ),
                async context => await _mediator.Send(new GetProtocolByPropertyId(context.GetArgument<Guid>("propertyId"))));
        }
    }
}