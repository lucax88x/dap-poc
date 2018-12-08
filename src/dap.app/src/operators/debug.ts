import { OperatorFunction } from 'rxjs';
import { tap } from 'rxjs/operators';

export function debug<T>(info: string): OperatorFunction<T, T> {
  return tap(
    (obj: T) => {
      console.log(info, obj);
    },
    err => {
      console.error(info, err);
    }
  );
}
