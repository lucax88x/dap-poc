import { OptionsObject } from 'notistack';

import { UUID } from '../code/uuid';

export class NotificationModel {
  public key: UUID;

  constructor(public message: string, public options?: OptionsObject) {
    this.key = UUID.Generate();
  }
}
