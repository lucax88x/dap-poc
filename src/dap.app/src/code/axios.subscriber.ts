import { AxiosPromise, CancelTokenSource } from 'axios';
import { head } from 'ramda';
import { Subscriber } from 'rxjs';

import { IGraphQlError, IGraphQlResponse } from './rxios';

export class AxiosSubscriber<T> extends Subscriber<T> {
  constructor(
    observer: Subscriber<T>,
    request: AxiosPromise<IGraphQlResponse<T>>,
    private cancelSource: CancelTokenSource
  ) {
    super(observer);

    request
      .then(response => {
        if (!!response.data.data) {
          this.next(response.data.data);
        } else if (!!response.data.errors) {
          this.error(this.processGraphqlError(response.data.errors));
        } else {
          this.error('No data and No error!');
        }

        this.complete();
      })
      .catch((err: Error) => {
        this.error(this.processHttpError(err));
        this.complete();
      });
  }

  public unsubscribe() {
    super.unsubscribe();
    this.cancelSource.cancel('Operation canceled by the user.');
  }

  private processHttpError(error: Error): string {
    console.error(error);
    return error.message;
  }
  private processGraphqlError(error: IGraphQlError[]): string {
    console.error(error);

    const err = head(error);

    if (!!err) {
      return err.message;
    }

    return 'Error';
  }
}
