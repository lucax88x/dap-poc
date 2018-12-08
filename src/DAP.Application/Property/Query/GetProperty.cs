using System;
using DAP.Core.Interfaces;

namespace DAP.Application.Property.Query
{
    public class GetProperty : Query<Domain.Property>
    {
        public Guid Id { get; }

        public GetProperty(Guid id)
        {
            Id = id;
        }
    }
}