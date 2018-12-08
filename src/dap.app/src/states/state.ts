import { RouterState } from 'connected-react-router';

import { INotificationManagerState } from './notification-manager.state';
import { IPropertyListState } from './property-list.state';
import { IPropertyProtocolEditState } from './property-protocol-edit.state';
import { IPropertyProtocolReviewState } from './property-protocol-review.state';
import { ITopBarState } from './top-bar.state';

export interface IState {
  router: RouterState;
  notificationManager: INotificationManagerState;
  topBar: ITopBarState;
  propertyList: IPropertyListState;
  propertyProtocolEdit: IPropertyProtocolEditState;
  propertyProtocolReview: IPropertyProtocolReviewState;
}

export type States =
  | RouterState
  | INotificationManagerState
  | ITopBarState
  | IPropertyListState
  | IPropertyProtocolEditState
  | IPropertyProtocolReviewState;
