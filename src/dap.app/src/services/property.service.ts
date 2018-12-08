import { map as _map } from 'ramda';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { rxios } from '../code/rxios';
import { UUID } from '../code/uuid';
import { fromOutput, IPropertyModel } from '../models/property.model';
import {
  GET_PROPERTIES,
  GET_PROPERTY_BY_ID,
  IGetPropertiesPayload,
  IGetPropertiesResponse,
  IGetPropertyByIdPayload,
  IGetPropertyByIdResponse
} from './property/queries';

export class PropertyService {
  get(filter: string): Observable<IPropertyModel[]> {
    return rxios
      .query<IGetPropertiesResponse, IGetPropertiesPayload>(GET_PROPERTIES, {
        filter
      })
      .pipe(
        map(m => m.properties),
        map(t => _map(fromOutput, t))
      );
  }
  getById(id: UUID): Observable<IPropertyModel> {
    return rxios
      .query<IGetPropertyByIdResponse, IGetPropertyByIdPayload>(
        GET_PROPERTY_BY_ID,
        {
          id: id.toString()
        }
      )
      .pipe(
        map(m => m.property),
        map(fromOutput)
      );
  }
}
