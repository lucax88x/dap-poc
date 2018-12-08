using System;
using DAP.Core.Interfaces;

namespace DAP.Application.Property.Commands
{
    public class CreateProperty : Command<Domain.Property>
    {
        public string Address { get; }
        public Guid Id { get; }

        public CreateProperty(string address, Guid? id = null)
        {
            Address = address;
            Id = !id.HasValue || id.Value == Guid.Empty ? Guid.NewGuid() : id.Value;
        }
    }
}