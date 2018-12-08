import { matchPath } from 'react-router-dom';
import { createSelector } from 'reselect';

import { Routes } from '../code/routes';
import { UUID } from '../code/uuid';
import { IState } from '../states/state';

const selectState = (state: IState) => state.propertyProtocolReview;
const selectRouter = (state: IState) => state.router;

export const selectPropertyId = createSelector(
  selectRouter,
  state => {
    const match = matchPath<{ propertyId: string }>(state.location.pathname, {
      path: Routes.Protocol.Review
    });

    if (!!match) {
      return new UUID(match.params.propertyId);
    }

    return new UUID();
  }
);
export const selectIsBusy = createSelector(
  selectState,
  state => state.isProtocolBusy || state.isPropertyBusy
);
export const selectProtocol = createSelector(
  selectState,
  state => state.protocol
);
export const selectProperty = createSelector(
  selectState,
  state => state.property
);
