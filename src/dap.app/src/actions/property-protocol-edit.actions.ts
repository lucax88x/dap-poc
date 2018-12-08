import { action } from 'typesafe-actions';

import { UUID } from '../code/uuid';
import { IPropertyModel } from '../models/property.model';
import { IProtocolInputModel } from '../models/protocol.input-model';
import { IProtocolModel } from '../models/protocol.model';

export const CLEAR_PROTOCOL_FORM =
  '[PROPERTY-PROTOCOL-EDIT] Clear Protocol Form';

export const PREVIOUS_STEP = '[PROPERTY-PROTOCOL-EDIT] Previous Step';
export const NEXT_STEP = '[PROPERTY-PROTOCOL-EDIT] Next Step';
export const GO_TO_STEP = '[PROPERTY-PROTOCOL-EDIT] Go To Step';

export const TRY_SAVE_STEP = '[PROPERTY-PROTOCOL-EDIT] Try Save Step';
export const SKIP_SAVE_STEP = '[PROPERTY-PROTOCOL-EDIT] Skip Save Step';
export const SAVE_STEP = '[PROPERTY-PROTOCOL-EDIT] Save Step';
export const SAVE_STEP_SUCCESS = '[PROPERTY-PROTOCOL-EDIT] Save Step Success';
export const SAVE_STEP_ERROR = '[PROPERTY-PROTOCOL-EDIT] Save Step Error';

export const TRY_COMPLETE_PROTOCOL =
  '[PROPERTY-PROTOCOL-EDIT] Try Complete Protocol';
export const SKIP_COMPLETE_PROTOCOL =
  '[PROPERTY-PROTOCOL-EDIT] Skip Complete Protocol';
export const COMPLETE_PROTOCOL = '[PROPERTY-PROTOCOL-EDIT] Complete Protocol';
export const COMPLETE_PROTOCOL_SUCCESS =
  '[PROPERTY-PROTOCOL-EDIT] Complete Protocol Success';
export const COMPLETE_PROTOCOL_ERROR =
  '[PROPERTY-PROTOCOL-EDIT] Complete Protocol Error';

export const GET_PROPERTY = '[PROPERTY-PROTOCOL-EDIT] Get Property';
export const GET_PROPERTY_SUCCESS =
  '[PROPERTY-PROTOCOL-EDIT] Get Property Success';
export const GET_PROPERTY_ERROR = '[PROPERTY-PROTOCOL-EDIT] Get Property Error';

export const GET_PROTOCOL = '[PROPERTY-PROTOCOL-EDIT] Get Protocol';
export const GET_PROTOCOL_SUCCESS =
  '[PROPERTY-PROTOCOL-EDIT] Get Protocol Success';
export const GET_PROTOCOL_ERROR = '[PROPERTY-PROTOCOL-EDIT] Get Protocol Error';

export const clearProtocolFormAction = () => action(CLEAR_PROTOCOL_FORM);

export const previousStepAction = () => action(PREVIOUS_STEP);
export const nextStepAction = () => action(NEXT_STEP);
export const goToStepAction = (index: number) => action(GO_TO_STEP, index);

export const trySaveStepAction = (model: IProtocolInputModel) =>
  action(TRY_SAVE_STEP, model);
export const skipSaveStepAction = (model: IProtocolInputModel) =>
  action(SKIP_SAVE_STEP, model);
export const saveStepAction = (model: IProtocolInputModel) =>
  action(SAVE_STEP, model);
export const saveStepSuccessAction = (model: IProtocolModel) =>
  action(SAVE_STEP_SUCCESS, model);
export const saveStepErrorAction = () => action(SAVE_STEP_ERROR);

export const tryCompleteProtocolAction = (model: IProtocolInputModel) =>
  action(TRY_COMPLETE_PROTOCOL, model);
export const skipCompleteProtocolAction = (model: IProtocolInputModel) =>
  action(SKIP_COMPLETE_PROTOCOL, model);
export const completeProtocolAction = (model: IProtocolInputModel) =>
  action(COMPLETE_PROTOCOL, model);
export const completeProtocolSuccessAction = (model: IProtocolModel) =>
  action(COMPLETE_PROTOCOL_SUCCESS, model);
export const completeProtocolErrorAction = () =>
  action(COMPLETE_PROTOCOL_ERROR);

export const getPropertyAction = (id: UUID) => action(GET_PROPERTY, id);
export const getPropertySuccessAction = (property: IPropertyModel) =>
  action(GET_PROPERTY_SUCCESS, property);
export const getPropertyErrorAction = () => action(GET_PROPERTY_ERROR);

export const getProtocolAction = (id: UUID) => action(GET_PROTOCOL, id);
export const getProtocolSuccessAction = (protocol: IProtocolModel) =>
  action(GET_PROTOCOL_SUCCESS, protocol);
export const getProtocolErrorAction = () => action(GET_PROTOCOL_ERROR);
