import { UUID } from '../code/uuid';
import { IPropertyOutputModel } from './property.output-model';

export interface IPropertyModel {
  id: UUID;
  address: string;
}

export function fromOutput(output: IPropertyOutputModel): IPropertyModel {
  return {
    id: new UUID(output.id),
    address: output.address
  };
}
