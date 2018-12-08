using System;
using DAP.Application.Protocol.Query;
using DAP.Web.Api.GraphQL.Protocol;
using GraphQL.Types;
using MediatR;

namespace DAP.Web.Api.GraphQL.Property
{
    public class PropertyType : ObjectGraphType<Domain.Property>
    {
        public PropertyType(IMediator mediator)
        {
            Name = nameof(Domain.Property);
            Description = "It's the single property";

            Field(d => d.Id, type: typeof(IdGraphType)).Description("The id of the property.");
            Field(d => d.Address).Description("The address");

            FieldAsync<ProtocolType>(
                "Protocol",
                "Associated Protocol",
                null,
                async context =>
                    await mediator.Send(new GetProtocolByPropertyId(Guid.Parse(context.Source.Id))));
        }
    }
}