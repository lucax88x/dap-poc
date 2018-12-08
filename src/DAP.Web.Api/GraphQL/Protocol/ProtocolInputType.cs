using DAP.Web.Api.GraphQL.Protocol.Inputs;
using GraphQL.Types;

namespace DAP.Web.Api.GraphQL.Protocol
{
    public class ProtocolInputType : InputObjectGraphType<ProtocolInput>
    {
        public ProtocolInputType()
        {
            Name = nameof(ProtocolInput);
            Field(x => x.Id, type: typeof(IdGraphType));
            Field(x => x.PropertyId, type: typeof(IdGraphType));
            Field(x => x.Note);
            Field(x => x.Images, true);
            Field(x => x.Signature, true);
        }
    }
}