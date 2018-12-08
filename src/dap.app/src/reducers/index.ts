import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import { IState } from '../states/state';
import { notificationManagerReducers } from './notification-manager.reducers';
import { propertyListReducers } from './property-list.reducers';
import { propertyProtocolEditReducers } from './property-protocol-edit.reducers';
import { propertyProtocolReviewReducers } from './property-protocol-review.reducers';
import { topBarReducers } from './top-bar.reducers';

export const rootReducers = (history: History<any>) =>
  combineReducers<IState>({
    router: connectRouter(history),
    notificationManager: notificationManagerReducers,
    topBar: topBarReducers,
    propertyList: propertyListReducers,
    propertyProtocolEdit: propertyProtocolEditReducers,
    propertyProtocolReview: propertyProtocolReviewReducers
  });
