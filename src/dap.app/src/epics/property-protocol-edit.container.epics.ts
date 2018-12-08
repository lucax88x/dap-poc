import { of } from 'rxjs';
import {
  concatMap,
  filter,
  flatMap,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import { Epics } from '.';
import { enqueueSnackarAction } from '../actions/notification-manager.actions';
import {
  clearProtocolFormAction,
  COMPLETE_PROTOCOL,
  completeProtocolAction,
  completeProtocolErrorAction,
  completeProtocolSuccessAction,
  GET_PROPERTY,
  GET_PROTOCOL,
  getPropertyAction,
  getPropertyErrorAction,
  getPropertySuccessAction,
  getProtocolAction,
  getProtocolErrorAction,
  getProtocolSuccessAction,
  nextStepAction,
  SAVE_STEP,
  SAVE_STEP_SUCCESS,
  saveStepAction,
  saveStepErrorAction,
  saveStepSuccessAction,
  SKIP_SAVE_STEP,
  skipCompleteProtocolAction,
  skipSaveStepAction,
  TRY_COMPLETE_PROTOCOL,
  TRY_SAVE_STEP
} from '../actions/property-protocol-edit.actions';
import { Routes } from '../code/routes';
import { IProtocolModel } from '../models/protocol.model';
import { catchErrorAndLog } from '../operators/catch-error-and-log';
import { ofActivatedRoute } from '../operators/of-activated-route';
import {
  selectPropertyIdForResume,
  selectPropertyIdForStart
} from '../selectors/property-protocol-edit.selectors';
import { selectIsOnline } from '../selectors/top-bar.selectors';
import { PropertyService } from '../services/property.service';
import { ProtocolService } from '../services/protocol.service';

export class PropertyProtocolEditEpic {
  private propertyService = new PropertyService();
  private protocolService = new ProtocolService();

  public get epics() {
    return [
      this.routeToClear,
      this.routeToFetchOnStart,
      this.routeToFetchOnResume,
      this.getProperty,
      this.getProtocol,
      this.trySaveStep,
      this.saveStep,
      this.skipSaveStep,
      this.goToNextStepAsStepIsSaved,
      this.tryCompleteProtocol,
      this.completeProtocol
    ];
  }

  public routeToClear: Epics = action$ =>
    action$.pipe(
      ofActivatedRoute(Routes.Protocol.Start, Routes.Protocol.Resume),
      map(_ => clearProtocolFormAction())
    );

  public routeToFetchOnStart: Epics = (action$, state$) =>
    action$.pipe(
      ofActivatedRoute(Routes.Protocol.Start),
      withLatestFrom(state$.pipe(map(selectPropertyIdForStart)), (_, id) => id),
      map(id => getPropertyAction(id))
    );

  public routeToFetchOnResume: Epics = (action$, state$) =>
    action$.pipe(
      ofActivatedRoute(Routes.Protocol.Resume),
      withLatestFrom(
        state$.pipe(map(selectPropertyIdForResume)),
        (_, id) => id
      ),
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

  public trySaveStep: Epics = (action$, state$) =>
    action$.pipe(
      filter(isOfType(TRY_SAVE_STEP)),
      withLatestFrom(
        state$.pipe(map(selectIsOnline)),
        ({ payload }, isOnline) => ({ model: payload, isOnline })
      ),
      map(({ model, isOnline }) => {
        if (isOnline) {
          return saveStepAction(model);
        } else {
          return skipSaveStepAction(model);
        }
      })
    );

  public saveStep: Epics = action$ =>
    action$.pipe(
      filter(isOfType(SAVE_STEP)),
      concatMap(({ payload }) =>
        this.protocolService.saveProtocol(payload).pipe(
          map(output => saveStepSuccessAction(output)),
          catchErrorAndLog(() => of(saveStepErrorAction()))
        )
      )
    );

  public goToNextStepAsStepIsSaved: Epics = action$ =>
    action$.pipe(
      filter(isOfType(SAVE_STEP_SUCCESS)),
      flatMap(_ => [
        enqueueSnackarAction('Saved!', { variant: 'success' }),
        nextStepAction()
      ])
    );

  public skipSaveStep: Epics = action$ =>
    action$.pipe(
      filter(isOfType(SKIP_SAVE_STEP)),
      map(_ => nextStepAction())
    );

  public tryCompleteProtocol: Epics = (action$, state$) =>
    action$.pipe(
      filter(isOfType(TRY_COMPLETE_PROTOCOL)),
      withLatestFrom(
        state$.pipe(map(selectIsOnline)),
        ({ payload }, isOnline) => ({ model: payload, isOnline })
      ),
      map(({ model, isOnline }) => {
        if (isOnline) {
          return completeProtocolAction(model);
        } else {
          return skipCompleteProtocolAction(model);
        }
      })
    );

  public completeProtocol: Epics = action$ =>
    action$.pipe(
      filter(isOfType(COMPLETE_PROTOCOL)),
      concatMap(({ payload }) =>
        this.protocolService
          .saveProtocol(payload)
          .pipe(catchErrorAndLog(() => of(completeProtocolErrorAction())))
      ),
      concatMap((model: IProtocolModel) =>
        this.protocolService.completeProtocol(model.id.toString()).pipe(
          map(output => completeProtocolSuccessAction(output)),
          catchErrorAndLog(() => of(completeProtocolErrorAction()))
        )
      )
    );
}
