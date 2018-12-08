using GraphQL.Types;

namespace DAP.Web.Api.GraphQL.Protocol
{
    public class ProtocolType : ObjectGraphType<Domain.Protocol>
    {
        public ProtocolType()
        {
            Name = nameof(Domain.Protocol);
            Description = "It's the single protocol";

            Field(d => d.Id, type: typeof(IdGraphType)).Description("The id of the protocol.");
            Field(d => d.Note).Description("The note");
            Field(d => d.Images, true).Description("The images, as base64");
            Field(d => d.Signature, true).Description("The signature, as base64");
            Field(d => d.Completed, true).Description("The protocol is readonly");
        }
    }
}