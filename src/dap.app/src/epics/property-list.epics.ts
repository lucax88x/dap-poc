import { of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import { Epics } from '.';
import {
  clearPropertiesAction,
  GET_PROPERTIES,
  getPropertiesErrorAction,
  getPropertiesSuccessAction
} from '../actions/property-list.actions';
import { Routes } from '../code/routes';
import { catchErrorAndLog } from '../operators/catch-error-and-log';
import { ofActivatedRoute } from '../operators/of-activated-route';
import { PropertyService } from '../services/property.service';

export class PropertyListEpic {
  private propertyService = new PropertyService();

  public get epics() {
    return [this.routeToClear, this.getProperties];
  }

  public routeToClear: Epics = action$ =>
    action$.pipe(
      ofActivatedRoute(Routes.Home),
      map(_ => clearPropertiesAction())
    );

  public getProperties: Epics = action$ =>
    action$.pipe(
      filter(isOfType(GET_PROPERTIES)),
      switchMap(({ payload }) =>
        this.propertyService.get(payload).pipe(
          map(items => getPropertiesSuccessAction(items)),
          catchErrorAndLog(error => of(getPropertiesErrorAction()))
        )
      )
    );
}
