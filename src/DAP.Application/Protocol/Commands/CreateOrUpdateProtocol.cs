using System;
using System.Collections.Immutable;
using DAP.Core.Interfaces;

namespace DAP.Application.Protocol.Commands
{
    public class CreateOrUpdateProtocol : Command<Domain.Protocol>
    {
        public Guid PropertyId { get; }
        public Guid Id { get; }
        public string Note { get; }
        public ImmutableArray<string> Images { get; }
        public string Signature { get; }

        public CreateOrUpdateProtocol(Guid propertyId, string note, string[] images, string signature, Guid? id = null)
        {
            PropertyId = propertyId;
            Note = note;
            Images = images?.ToImmutableArray() ?? new ImmutableArray<string>();
            Signature = signature;
            Id = !id.HasValue || id.Value == Guid.Empty ? Guid.NewGuid() : id.Value;
        }
    }
}