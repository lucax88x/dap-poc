import { filter as _filter } from 'ramda';
import { empty, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { UUID } from '../code/uuid';
import { IPropertyModel } from '../models/property.model';

const filterAddress = (filter: string) =>
  _filter<IPropertyModel>(prop => prop.address.indexOf(filter) !== -1);

export class PropertyService {
  private props: IPropertyModel[];
  constructor() {
    const prop1: IPropertyModel = {
      id: UUID.Generate(),
      address: 'Bolligerstrasse 5, Ostermundigen, Villa Frei'
    };
    const prop2: IPropertyModel = {
      id: UUID.Generate(),
      address: 'Bernstrasse 11, Ostermundigen, Apartment 2b'
    };
    const prop3: IPropertyModel = {
      id: UUID.Generate(),
      address: 'Umfahrunsstrasse 102, Ostermundigen, Apartment 3a'
    };

    this.props = [prop1, prop2, prop3];
  }
  get(filter: string): Observable<IPropertyModel[]> {
    if (filter.length === 0) {
      return empty().pipe(delay(500));
    }

    return of<IPropertyModel[]>(filterAddress(filter)(this.props)).pipe(
      delay(500)
    );
  }
}
