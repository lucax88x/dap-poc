import { of } from 'rxjs';
import {
  filter,
  flatMap,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import { Epics } from '.';
import {
  GET_PROPERTY,
  GET_PROTOCOL,
  getPropertyAction,
  getPropertyErrorAction,
  getPropertySuccessAction,
  getProtocolAction,
  getProtocolErrorAction,
  getProtocolSuccessAction
} from '../actions/property-protocol-review.actions';
import { Routes } from '../code/routes';
import { catchErrorAndLog } from '../operators/catch-error-and-log';
import { ofActivatedRoute } from '../operators/of-activated-route';
import { selectPropertyId } from '../selectors/property-protocol-review.selectors';
import { PropertyService } from '../services/property.service';
import { ProtocolService } from '../services/protocol.service';

export class PropertyProtocolReviewEpic {
  private propertyService = new PropertyService();
  private protocolService = new ProtocolService();

  public get epics() {
    return [this.routeToFetch, this.getProperty, this.getProtocol];
  }

  public routeToFetch: Epics = (action$, state$) =>
    action$.pipe(
      ofActivatedRoute(Routes.Protocol.Review),
      withLatestFrom(state$.pipe(map(selectPropertyId)), (_, id) => id),
      flatMap(id => [getProtocolAction(id), getPropertyAction(id)])
    );

  public getProperty: Epics = action$ =>
    action$.pipe(
      filter(isOfType(GET_PROPERTY)),
      switchMap(({ payload }) =>
        this.propertyService.getById(payload).pipe(
          map(item => getPropertySuccessAction(item)),
          catchErrorAndLog(error => of(getPropertyErrorAction()))
        )
      )
    );

  public getProtocol: Epics = action$ =>
    action$.pipe(
      filter(isOfType(GET_PROTOCOL)),
      switchMap(({ payload }) =>
        this.protocolService.getByProperty(payload).pipe(
          map(item => getProtocolSuccessAction(item)),
          catchErrorAndLog(error => of(getProtocolErrorAction()))
        )
      )
    );
}
