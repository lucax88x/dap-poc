import { RouterState } from 'connected-react-router';
import { matchPath } from 'react-router-dom';
import { createSelector } from 'reselect';

import { Routes } from '../code/routes';
import { UUID } from '../code/uuid';
import { IState } from '../states/state';

const selectPropertyIdByRoute = (route: string) => (state: RouterState) => {
  const match = matchPath<{ propertyId: string }>(state.location.pathname, {
    path: route
  });

  if (!!match) {
    return new UUID(match.params.propertyId);
  }

  return new UUID();
};

const selectState = (state: IState) => state.propertyProtocolEdit;
const selectRouter = (state: IState) => state.router;

export const selectActiveStep = createSelector(
  selectState,
  state => state.activeStep
);
export const selectSteps = createSelector(
  selectState,
  state => state.steps
);
export const selectHasStarted = createSelector(
  selectState,
  state => state.hasStarted
);
export const selectPropertyIdForStart = createSelector(
  selectRouter,
  selectPropertyIdByRoute(Routes.Protocol.Start)
);
export const selectPropertyIdForResume = createSelector(
  selectRouter,
  selectPropertyIdByRoute(Routes.Protocol.Resume)
);
export const selectIsBusy = createSelector(
  selectState,
  state =>
    state.isProtocolBusy ||
    state.isPropertyBusy ||
    state.isSaveBusy ||
    state.isCompleteBusy
);
export const selectProtocol = createSelector(
  selectState,
  state => state.protocol
);
export const selectProperty = createSelector(
  selectState,
  state => state.property
);
