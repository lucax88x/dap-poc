using System;

namespace DAP.Infra.Property
{
    public class PropertyDto
    {
        public string Id { get; }
        public string Address { get; }

        public PropertyDto(string id, string address)
        {
            Id = id;
            Address = address;
        }
    }
}