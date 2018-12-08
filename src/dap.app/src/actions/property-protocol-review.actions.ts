import { action } from 'typesafe-actions';

import { UUID } from '../code/uuid';
import { IPropertyModel } from '../models/property.model';
import { IProtocolModel } from '../models/protocol.model';

console.error('we can use the same epic & call as we have same graphl tree');
export const GET_PROPERTY = '[PROPERTY-PROTOCOL-REVIEW] Get Property';
export const GET_PROPERTY_SUCCESS =
  '[PROPERTY-PROTOCOL-REVIEW] Get Property Success';
export const GET_PROPERTY_ERROR =
  '[PROPERTY-PROTOCOL-REVIEW] Get Property Error';

export const GET_PROTOCOL = '[PROPERTY-PROTOCOL-REVIEW] Get Protocol';
export const GET_PROTOCOL_SUCCESS =
  '[PROPERTY-PROTOCOL-REVIEW] Get Protocol Success';
export const GET_PROTOCOL_ERROR =
  '[PROPERTY-PROTOCOL-REVIEW] Get Protocol Error';

export const getPropertyAction = (id: UUID) => action(GET_PROPERTY, id);
export const getPropertySuccessAction = (property: IPropertyModel) =>
  action(GET_PROPERTY_SUCCESS, property);
export const getPropertyErrorAction = () => action(GET_PROPERTY_ERROR);

export const getProtocolAction = (id: UUID) => action(GET_PROTOCOL, id);
export const getProtocolSuccessAction = (protocol: IProtocolModel) =>
  action(GET_PROTOCOL_SUCCESS, protocol);
export const getProtocolErrorAction = () => action(GET_PROTOCOL_ERROR);
