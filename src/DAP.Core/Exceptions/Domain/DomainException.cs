using System;

namespace DAP.Core.Exceptions.Domain
{
    public class DomainException : Exception
    {
        protected DomainException(string message) : base(message)
        {
        }
    }
}