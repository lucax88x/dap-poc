import { produce } from 'immer';

import { PropertyListActions } from '../actions';
import {
  CLEAR_PROPERTIES,
  GET_PROPERTIES,
  GET_PROPERTIES_ERROR,
  GET_PROPERTIES_SUCCESS
} from '../actions/property-list.actions';
import { IPropertyListState } from '../states/property-list.state';

export const initialPropertyListState: IPropertyListState = {
  isBusy: false,
  properties: []
};

export const propertyListReducers = (
  state = initialPropertyListState,
  action: PropertyListActions
): IPropertyListState =>
  produce(state, draft => {
    switch (action.type) {
      case CLEAR_PROPERTIES:
        draft.properties = [];
        break;
      case GET_PROPERTIES:
        draft.isBusy = true;
        draft.properties = [];
        break;
      case GET_PROPERTIES_SUCCESS:
        draft.isBusy = false;
        draft.properties = action.payload;
        break;
      case GET_PROPERTIES_ERROR:
        draft.isBusy = false;
        break;
    }
  });
