using DAP.Infra.Property;
using GraphQL.Types;

namespace DAP.Web.Api.GraphQL.Types
{
    public class PropertyType : ObjectGraphType<PropertyDto>
    {
        public PropertyType()
        {
            Name = nameof(PropertyDto);
            Description = "It's the single property";

            Field(d => d.Id, type: typeof(IdGraphType)).Description("The id of the property.");
            Field(d => d.Address).Description("The address");
        }
    }
}