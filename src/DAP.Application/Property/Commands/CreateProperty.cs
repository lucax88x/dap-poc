using System;
using System.Net.Sockets;
using DAP.Core.Interfaces;

namespace DAP.Application.Property.Commands
{
    public class CreateProperty : Command<Guid>
    {
        public Guid Id { get; }
        public string Address { get; }
        
        public CreateProperty(string address, Guid? id = null)
        {
            Id = !id.HasValue || id.Value == Guid.Empty ? Guid.NewGuid() : id.Value;
            Address = address;
        }
    }
}