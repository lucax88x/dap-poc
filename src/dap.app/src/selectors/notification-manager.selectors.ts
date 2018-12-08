import { createSelector } from 'reselect';

import { IState } from '../states/state';

const selectState = (state: IState) => state.notificationManager;

export const selectNotifications = createSelector(
  selectState,
  state => state.notifications
);
