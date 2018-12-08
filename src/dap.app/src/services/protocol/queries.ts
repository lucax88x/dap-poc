import { IProtocolOutputModel } from '../../models/protocol.output-model';

export const GET_PROTOCOL_BY_PROPERTY_ID = `
  query ($propertyId: String!) {
    protocol(propertyId: $propertyId) {
      id
      note
      images
      signature
      completed
    }
  } 
`;
export interface IGetProtocolByPropertyIdPayload {
  propertyId: string;
}
export interface IGetProtocolByPropertyIdResponse {
  protocol: IProtocolOutputModel;
}
