import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { rxios } from '../code/rxios';
import { UUID } from '../code/uuid';
import { IProtocolInputModel } from '../models/protocol.input-model';
import { fromOutput, IProtocolModel } from '../models/protocol.model';
import {
  COMPLETE_PROTOCOL,
  ICompleteProtocolPayload,
  ICompleteProtocolResponse,
  ISaveProtocolPayload,
  ISaveProtocolResponse,
  SAVE_PROTOCOL
} from './protocol/mutations';
import {
  GET_PROTOCOL_BY_PROPERTY_ID,
  IGetProtocolByPropertyIdPayload,
  IGetProtocolByPropertyIdResponse
} from './protocol/queries';

export class ProtocolService {
  getByProperty(propertyId: UUID): Observable<IProtocolModel> {
    return rxios
      .query<IGetProtocolByPropertyIdResponse, IGetProtocolByPropertyIdPayload>(
        GET_PROTOCOL_BY_PROPERTY_ID,
        {
          propertyId: propertyId.toString()
        }
      )
      .pipe(
        map(m => m.protocol),
        map(fromOutput)
      );
  }

  saveProtocol(protocol: IProtocolInputModel): Observable<IProtocolModel> {
    return rxios
      .mutation<ISaveProtocolResponse, ISaveProtocolPayload>(SAVE_PROTOCOL, {
        protocol
      })
      .pipe(
        map(m => m.protocol),
        map(fromOutput)
      );
  }

  completeProtocol(id: string): Observable<IProtocolModel> {
    return rxios
      .mutation<ICompleteProtocolResponse, ICompleteProtocolPayload>(
        COMPLETE_PROTOCOL,
        {
          id
        }
      )
      .pipe(
        map(m => m.completeProtocol),
        map(fromOutput)
      );
  }
}
