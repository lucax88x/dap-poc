import { ActionType } from 'typesafe-actions';

import * as propertyList from './property-list.actions';
import * as topBar from './top-bar.actions';

export type TopBarActions = ActionType<typeof topBar>;
export type PropertyListActions = ActionType<typeof propertyList>;

export type Actions = TopBarActions | PropertyListActions;
