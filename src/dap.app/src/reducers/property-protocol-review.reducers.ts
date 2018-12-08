import { produce } from 'immer';

import { PropertyProtocolReviewActions } from '../actions';
import {
  GET_PROPERTY,
  GET_PROPERTY_ERROR,
  GET_PROPERTY_SUCCESS,
  GET_PROTOCOL,
  GET_PROTOCOL_ERROR,
  GET_PROTOCOL_SUCCESS
} from '../actions/property-protocol-review.actions';
import { IPropertyProtocolReviewState } from '../states/property-protocol-review.state';

export const initialPropertyListState: IPropertyProtocolReviewState = {
  isProtocolBusy: false,
  property: null,

  isPropertyBusy: false,
  protocol: null
};

export const propertyProtocolReviewReducers = (
  state = initialPropertyListState,
  action: PropertyProtocolReviewActions
): IPropertyProtocolReviewState =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PROPERTY:
        draft.isPropertyBusy = true;
        draft.property = null;
        return;
      case GET_PROPERTY_SUCCESS:
        draft.isPropertyBusy = false;
        draft.property = action.payload;
        return;
      case GET_PROPERTY_ERROR:
        draft.isPropertyBusy = false;
        return;

      case GET_PROTOCOL:
        draft.isProtocolBusy = true;
        draft.protocol = null;
        return;
      case GET_PROTOCOL_SUCCESS:
        draft.isProtocolBusy = false;
        draft.protocol = action.payload;
        return;
      case GET_PROTOCOL_ERROR:
        draft.isProtocolBusy = false;
        return;

      default:
        return state;
    }
  });
