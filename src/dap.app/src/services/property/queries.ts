import { IPropertyOutputModel } from '../../models/property.output-model';

export const GET_PROPERTIES = `
  query ($filter: String!) {
    properties(filter: $filter) {
      id,
      address,
      protocol {
        completed
      }
    }
  } 
`;
export interface IGetPropertiesPayload {
  filter: string;
}
export interface IGetPropertiesResponse {
  properties: IPropertyOutputModel[];
}

export const GET_PROPERTY_BY_ID = `
  query ($id: String!) {
    property(id: $id) {
      id,
      address
    }
  } 
`;
export interface IGetPropertyByIdPayload {
  id: string;
}
export interface IGetPropertyByIdResponse {
  property: IPropertyOutputModel;
}
