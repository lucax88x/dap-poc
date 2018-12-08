using System;

namespace DAP.Web.Api.GraphQL.Protocol.Inputs
{
    public class ProtocolInput
    {
        public Guid PropertyId { get; set; }
        public Guid Id { get; set; }
        public string Note { get; set; }
        public string[] Images { get; set; }
        public string Signature { get; set; }
    }
}