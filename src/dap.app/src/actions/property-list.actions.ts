import { action } from 'typesafe-actions';

import { IPropertyModel } from '../models/property.model';

export const CLEAR_PROPERTIES = '[PROPERTY-LIST] Clear Properties';
export const GET_PROPERTIES = '[PROPERTY-LIST] Get Properties';
export const GET_PROPERTIES_SUCCESS = '[PROPERTY-LIST] Get Properties Success';
export const GET_PROPERTIES_ERROR = '[PROPERTY-LIST] Get Properties Error';

export const clearPropertiesAction = () => action(CLEAR_PROPERTIES);
export const getPropertiesAction = (filter: string) =>
  action(GET_PROPERTIES, filter);
export const getPropertiesSuccessAction = (properties: IPropertyModel[]) =>
  action(GET_PROPERTIES_SUCCESS, properties);
export const getPropertiesErrorAction = () => action(GET_PROPERTIES_ERROR);
