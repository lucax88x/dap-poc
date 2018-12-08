import { filter, map } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import { Epics } from '.';
import { enqueueSnackarAction } from '../actions/notification-manager.actions';
import { IS_OFFLINE, IS_ONLINE } from '../actions/top-bar.actions';

export class TopBarEpic {
  public get epics() {
    return [this.showNotificationWhenOnline, this.showNotificationWhenOffline];
  }

  public showNotificationWhenOnline: Epics = action$ =>
    action$.pipe(
      filter(isOfType(IS_ONLINE)),
      map(_ => enqueueSnackarAction('Online', { variant: 'success' }))
    );

  public showNotificationWhenOffline: Epics = action$ =>
    action$.pipe(
      filter(isOfType(IS_OFFLINE)),
      map(_ => enqueueSnackarAction('Offline', { variant: 'error' }))
    );
}
