using System;
using System.Collections.Immutable;
using DAP.Core.Interfaces;

namespace DAP.Application.Protocol.Commands
{
    public class CompleteProtocol : Command<Domain.Protocol>
    {
        public Guid Id { get; }

        public CompleteProtocol(Guid id)
        {
            Id = id;
        }
    }
}