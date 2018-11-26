import { map as _map } from 'ramda';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { rxios } from '../code/rxios';
import { fromOutput, IPropertyModel } from '../models/property.model';
import {
  GET_PROPERTIES,
  IGetPropertiesResponse,
  IGetPropertiesPayload
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
}
