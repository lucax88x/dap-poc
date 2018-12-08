import { merge, Observable, ObservableInput, of, OperatorFunction } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Actions } from '../actions';
import { enqueueSnackarAction } from '../actions/notification-manager.actions';
import { isString } from '../code/is';

export function catchErrorAndLog<T, R, E>(
  selector: (
    error: E,
    caught: Observable<T | R | Actions>
  ) => ObservableInput<R>
): OperatorFunction<T, T | R | Actions> {
  return catchError((error, caught) => {
    let toShowError = error;
    if (!isString(error)) {
      console.error(error);
      toShowError = 'Error';
    }

    return merge(
      selector(error, caught),
      of(enqueueSnackarAction(toShowError, { variant: 'error' }))
    );
  });
}
