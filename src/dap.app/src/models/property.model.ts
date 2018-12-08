import { UUID } from '../code/uuid';
import { IPropertyOutputModel } from './property.output-model';

export interface IPropertyModel {
  id: UUID;
  address: string;

  hasProtocol: boolean;
  hasCompletedProtocol: boolean;
}

export function fromOutput(output: IPropertyOutputModel): IPropertyModel {
  return {
    id: new UUID(output.id),
    address: output.address,
    hasProtocol: !!output.protocol,
    hasCompletedProtocol: !!output.protocol && output.protocol.completed
  };
}
