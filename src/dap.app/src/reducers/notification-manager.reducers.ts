import { produce } from 'immer';
import { findIndex } from 'ramda';

import { NotificationManagerActions } from '../actions';
import {
  ENQUEUE_SNACKBAR,
  REMOVE_SNACKBAR
} from '../actions/notification-manager.actions';
import { INotificationManagerState } from '../states/notification-manager.state';

export const notificationManagerState: INotificationManagerState = {
  notifications: []
};

export const notificationManagerReducers = (
  state = notificationManagerState,
  action: NotificationManagerActions
): INotificationManagerState =>
  produce(state, draft => {
    switch (action.type) {
      case ENQUEUE_SNACKBAR:
        draft.notifications.push(action.payload);
        break;
      case REMOVE_SNACKBAR:
        draft.notifications.splice(
          findIndex(n => n.key.equals(action.payload), draft.notifications)
        );
        break;
    }
  });
