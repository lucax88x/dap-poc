using System;
using DAP.Application.Protocol.Commands;
using DAP.Web.Api.GraphQL.Protocol;
using DAP.Web.Api.GraphQL.Protocol.Inputs;
using GraphQL.Types;
using MediatR;

namespace DAP.Web.Api.GraphQL
{
    public class DapMutation : ObjectGraphType
    {
        private readonly IMediator _mediator;

        public DapMutation(IMediator mediator)
        {
            _mediator = mediator;

            Name = nameof(DapMutation);

            SetProtocolMutations();
        }

        private void SetProtocolMutations()
        {
            FieldAsync<ProtocolType>(
                "protocol",
                arguments: new QueryArguments(
                    new QueryArgument<NonNullGraphType<ProtocolInputType>> {Name = "protocol"}
                ),
                resolve: async context =>
                {
                    var input = context.GetArgument<ProtocolInput>("protocol");
                    return await _mediator.Send(new CreateOrUpdateProtocol(input.PropertyId, input.Note, input.Images,
                        input.Signature, input.Id));
                });

            FieldAsync<ProtocolType>(
                "completeProtocol",
                arguments: new QueryArguments(
                    new QueryArgument<IdGraphType> {Name = "id"}
                ),
                resolve: async context =>
                {
                    var id = context.GetArgument<Guid>("id");
                    return await _mediator.Send(new CompleteProtocol(id));
                });
        }
    }
}