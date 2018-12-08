import { OptionsObject } from 'notistack';
import { action } from 'typesafe-actions';

import { UUID } from '../code/uuid';
import { NotificationModel } from '../models/notification.model';

export const ENQUEUE_SNACKBAR = '[NOTIFICATION-MANAGER] Enqueue snackbar';
export const REMOVE_SNACKBAR = '[NOTIFIATION-MANAGER] Remove snackbar';

export const enqueueSnackarAction = (
  message: string,
  options?: OptionsObject
) => action(ENQUEUE_SNACKBAR, new NotificationModel(message, options));
export const removeSnackbarAction = (key: UUID) => action(REMOVE_SNACKBAR, key);
