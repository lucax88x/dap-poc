import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import { topBarReducers } from './top-bar.reducers';
import { propertyListReducers } from './property-list.reducers';

export const rootReducers = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    topBar: topBarReducers,
    propertyList: propertyListReducers
  });
