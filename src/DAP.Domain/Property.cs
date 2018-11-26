using System;
using DAP.Core;

namespace DAP.Domain
{
    public class Property: AggregateRoot
    {
        public string Address { get; }

        private Property(Guid id, string address) : base(id)
        {
            Address = address;
        }
        
        public static Property Create(Guid id, string address)
        {
            var instance = new Property(id, address);

            return instance;
        }
    }
}