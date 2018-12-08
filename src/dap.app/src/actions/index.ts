import { RouterAction } from 'connected-react-router';
import { ActionType } from 'typesafe-actions';

import * as notificationManager from './notification-manager.actions';
import * as propertyList from './property-list.actions';
import * as propertyProtocolEdit from './property-protocol-edit.actions';
import * as propertyProtocolReview from './property-protocol-review.actions';
import * as topBar from './top-bar.actions';

export type NotificationManagerActions = ActionType<typeof notificationManager>;
export type TopBarActions = ActionType<typeof topBar>;
export type PropertyListActions = ActionType<typeof propertyList>;
export type PropertyProtocolEditActions = ActionType<
  typeof propertyProtocolEdit
>;
export type PropertyProtocolReviewActions = ActionType<
  typeof propertyProtocolReview
>;

export type Actions =
  | RouterAction
  | NotificationManagerActions
  | TopBarActions
  | PropertyListActions
  | PropertyProtocolEditActions
  | PropertyProtocolReviewActions;
