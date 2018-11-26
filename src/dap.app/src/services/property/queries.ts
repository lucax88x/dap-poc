import { IPropertyOutputModel } from '../../models/property.output-model';

export const GET_PROPERTIES = `
    query ($filter: String!) {
        properties(filter: $filter) {
            id,
            address
        }
    } 
`;
export interface IGetPropertiesPayload {
  filter: string;
}
export interface IGetPropertiesResponse {
  properties: IPropertyOutputModel[];
}
