namespace DAP.Domain
{
    public class Property
    {
        public string Id { get; }
        public string Address { get; }

        public Property(string id, string address)
        {
            Id = id;
            Address = address;
        }
    }
}