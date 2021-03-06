import { createSelector } from 'reselect';

import { IState } from '../states/state';

const selectState = (state: IState) => state.propertyList;

export const selectIsBusy = createSelector(
  selectState,
  state => state.isBusy
);
export const selectProperties = createSelector(
  selectState,
  state => state.properties
);
