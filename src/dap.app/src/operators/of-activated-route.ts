import { LOCATION_CHANGE, LocationChangeAction } from 'connected-react-router';
import { any } from 'ramda';
import { matchPath } from 'react-router';
import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Actions } from '../actions';

export function ofActivatedRoute(
  ...routes: string[]
): OperatorFunction<Actions, Actions> {
  return filter((action: Actions) => {
    const isRouteAction = action.type === LOCATION_CHANGE;
    if (isRouteAction) {
      const routeAction = action as LocationChangeAction;
      const pathname = routeAction.payload.location.pathname;

      return any(route => !!matchPath(pathname, route), routes);
    }
    return isRouteAction;
  });
}
