import { produce } from 'immer';
import { max, min } from 'ramda';

import { PropertyProtocolEditActions } from '../actions';
import {
  CLEAR_PROTOCOL_FORM,
  COMPLETE_PROTOCOL,
  COMPLETE_PROTOCOL_ERROR,
  COMPLETE_PROTOCOL_SUCCESS,
  GET_PROPERTY,
  GET_PROPERTY_ERROR,
  GET_PROPERTY_SUCCESS,
  GET_PROTOCOL,
  GET_PROTOCOL_ERROR,
  GET_PROTOCOL_SUCCESS,
  GO_TO_STEP,
  NEXT_STEP,
  PREVIOUS_STEP,
  SAVE_STEP,
  SAVE_STEP_ERROR,
  SAVE_STEP_SUCCESS,
  SKIP_SAVE_STEP
} from '../actions/property-protocol-edit.actions';
import { fromInput } from '../models/protocol.model';
import { IPropertyProtocolEditState } from '../states/property-protocol-edit.state';

export const initialPropertyListState: IPropertyProtocolEditState = {
  activeStep: 0,
  steps: ['note', 'pictures', 'signature', 'send'],

  hasStarted: false,

  isProtocolBusy: false,
  property: null,

  isPropertyBusy: false,
  protocol: null,

  isSaveBusy: false,

  isCompleteBusy: false
};

export const propertyProtocolEditReducers = (
  state = initialPropertyListState,
  action: PropertyProtocolEditActions
): IPropertyProtocolEditState =>
  produce(state, draft => {
    switch (action.type) {
      case CLEAR_PROTOCOL_FORM:
        draft.activeStep = 0;
        draft.property = null;
        draft.protocol = null;
        draft.hasStarted = false;
        return;

      case PREVIOUS_STEP:
        draft.activeStep--;
        draft.activeStep = max(draft.activeStep, 0);
        return;
      case NEXT_STEP:
        draft.activeStep++;
        draft.activeStep = min(draft.steps.length, draft.activeStep);
        draft.hasStarted = true;
        return;
      case GO_TO_STEP:
        draft.activeStep = action.payload;
        draft.hasStarted = true;
        return;

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

      case SAVE_STEP:
        draft.isSaveBusy = true;
        return;
      case SAVE_STEP_SUCCESS:
        draft.isSaveBusy = false;
        draft.protocol = action.payload;
        return;
      case SAVE_STEP_ERROR:
        draft.isSaveBusy = false;
        return;

      case SKIP_SAVE_STEP:
        draft.protocol = fromInput(action.payload);
        return;

      case COMPLETE_PROTOCOL:
        draft.isCompleteBusy = true;
        return;
      case COMPLETE_PROTOCOL_SUCCESS:
        draft.isCompleteBusy = false;
        draft.protocol = action.payload;
        return;
      case COMPLETE_PROTOCOL_ERROR:
        draft.isCompleteBusy = false;
        return;

      default:
        return state;
    }
  });
