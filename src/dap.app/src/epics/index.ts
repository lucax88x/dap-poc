import { combineEpics, Epic } from 'redux-observable';

import { Actions } from '../actions';
import { IState } from '../states/state';
import { PropertyListEpic } from './property-list.epics';
import { PropertyProtocolEditEpic } from './property-protocol-edit.container.epics';
import { PropertyProtocolReviewEpic } from './property-protocol-review.container.epics';
import { TopBarEpic } from './top-bar.epics';

const topBarEpic = new TopBarEpic();
const propertyListEpic = new PropertyListEpic();
const propertyProtocolEditEpic = new PropertyProtocolEditEpic();
const propertyProtocolReviewEpic = new PropertyProtocolReviewEpic();

export const rootEpics = combineEpics<Actions, Actions, IState>(
  ...topBarEpic.epics,
  ...propertyListEpic.epics,
  ...propertyProtocolEditEpic.epics,
  ...propertyProtocolReviewEpic.epics
);

export type Epics = Epic<Actions, Actions, IState>;
