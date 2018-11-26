import { IPropertyModel } from '../models/property.model';

export interface IPropertyListState {
  isBusy: boolean;
  properties: IPropertyModel[];
}
