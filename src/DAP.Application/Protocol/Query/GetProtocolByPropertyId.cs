using System;
using DAP.Core.Interfaces;

namespace DAP.Application.Protocol.Query
{
    public class GetProtocolByPropertyId : Query<Domain.Protocol>
    {
        public Guid PropertyId { get; }

        public GetProtocolByPropertyId(Guid propertyId)
        {
            PropertyId = propertyId;
        }
    }
}