using System;
using System.Collections.Immutable;
using DAP.Core.Exceptions.Domain;

namespace DAP.Domain
{
    // study to put the whole protocol as child of property or use semantics ids? how does that affects query then?
    public class Protocol
    {
        public string Id { get; }
        public string PropertyId { get; }
        public string Note { get; }
        public ImmutableArray<string> Images { get; }
        public string Signature { get; }
        public bool Completed { get; private set; }

        public Protocol(string id, string propertyId, string note, ImmutableArray<string> images,
            string signature, bool completed)
        {
            Id = id;
            PropertyId = propertyId;
            Note = note;
            Images = images;
            Signature = signature;
            Completed = completed;
        }

        public void SetCompleted()
        {
            if (Completed)
            {
                throw new ProtocolIsAlreadyCompletedException();
            }

            // perform some validation that must be met when it's completed?

            Completed = true;
        }
    }
}