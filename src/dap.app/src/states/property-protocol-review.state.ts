import { IPropertyModel } from '../models/property.model';
import { IProtocolModel } from '../models/protocol.model';

export interface IPropertyProtocolReviewState {
  isPropertyBusy: boolean;
  property: IPropertyModel | null;

  isProtocolBusy: boolean;
  protocol: IProtocolModel | null;
}
