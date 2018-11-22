import { ActionType } from 'typesafe-actions';

import * as propertyList from './property-list.actions';

export type PropertyListActions = ActionType<typeof propertyList>;

export type Actions = PropertyListActions;
