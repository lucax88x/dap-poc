using System;

namespace DAP.Core
{
    public abstract class AggregateRoot
    {
        public Guid Id { get; }

        protected AggregateRoot(Guid id)
        {
            Id = id;
        }
    }
}