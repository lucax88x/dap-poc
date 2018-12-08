import { IPropertyModel } from '../models/property.model';
import { IProtocolModel } from '../models/protocol.model';

export interface IPropertyProtocolEditState {
  activeStep: number;
  steps: string[];

  hasStarted: boolean;

  isPropertyBusy: boolean;
  property: IPropertyModel | null;

  isProtocolBusy: boolean;
  protocol: IProtocolModel | null;

  isSaveBusy: boolean;

  isCompleteBusy: boolean;
}
