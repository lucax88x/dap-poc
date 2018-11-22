import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import { PropertyListActions } from '../actions';
import {
  GET_PROPERTIES,
  getPropertiesErrorAction,
  getPropertiesSuccessAction
} from '../actions/property-list.actions';
import { PropertyService } from '../services/property.service';
import { IPropertyListState } from '../states/property-list.state';

export class PropertyListEpic {
  private propertyService = new PropertyService();

  public get epics() {
    return [this.getProperties];
  }

  public getProperties: Epic<
    PropertyListActions,
    PropertyListActions,
    IPropertyListState
  > = action$ =>
    action$.pipe(
      filter(isOfType(GET_PROPERTIES)),
      switchMap(({ payload }) =>
        this.propertyService.get(payload).pipe(
          map(items => getPropertiesSuccessAction(items)),
          catchError(error => of(getPropertiesErrorAction()))
        )
      )
    );
}
