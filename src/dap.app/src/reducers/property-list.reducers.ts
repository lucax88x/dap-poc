import { produce } from 'immer';

import { PropertyListActions } from '../actions';
import {
  GET_PROPERTIES,
  GET_PROPERTIES_SUCCESS
} from '../actions/property-list.actions';
import { IPropertyListState } from '../states/property-list.state';

export const initialPropertyListState: IPropertyListState = {
  properties: []
};

export const propertyListReducers = (
  state = initialPropertyListState,
  action: PropertyListActions
): IPropertyListState =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROPERTIES:
        draft.properties = [];
        return;
      case GET_PROPERTIES_SUCCESS:
        draft.properties = action.payload;
        return;
      default:
        return state;
    }
  });
