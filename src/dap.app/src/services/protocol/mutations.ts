import { IProtocolInputModel } from '../../models/protocol.input-model';
import { IProtocolOutputModel } from '../../models/protocol.output-model';

export const SAVE_PROTOCOL = `
  mutation($protocol: ProtocolInput!) {
    protocol(protocol: $protocol) {
        id
        note
        images
        signature
        completed
    }
  }
`;
export interface ISaveProtocolPayload {
  protocol: IProtocolInputModel;
}
export interface ISaveProtocolResponse {
  protocol: IProtocolOutputModel;
}

export const COMPLETE_PROTOCOL = `
  mutation($id: ID!) {
    completeProtocol(id: $id) {
        id
        note
        images
        signature
        completed
    }
  }
`;
export interface ICompleteProtocolPayload {
  id: string;
}
export interface ICompleteProtocolResponse {
  completeProtocol: IProtocolOutputModel;
}
