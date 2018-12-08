namespace DAP.Core.Exceptions.Domain
{
    public class ProtocolIsAlreadyCompletedException : DomainException
    {
        public ProtocolIsAlreadyCompletedException() : base("Protocol Is Already completed")
        {
        }
    }
}