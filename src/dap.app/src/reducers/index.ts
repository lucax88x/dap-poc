import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';

import { propertyListReducers } from './property-list.reducers';

export const rootReducers = (history: History<any>) =>
  combineReducers({
    router: connectRouter(history),
    propertyList: propertyListReducers
  });
