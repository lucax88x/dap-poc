import { combineEpics } from 'redux-observable';

import { Actions } from '../actions';
import { States } from '../states/state';
import { PropertyListEpic } from './property-list.epics';

const propertyListEpic = new PropertyListEpic();
export const rootEpics = combineEpics<Actions, Actions, States>(
  ...propertyListEpic.epics
);
