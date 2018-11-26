import { createSelector } from 'reselect';

import { IState } from '../states/state';

const selectState = (state: IState) => state.topBar;

export const selectIsOnline = createSelector(
  selectState,
  state => state.isOnline
);
