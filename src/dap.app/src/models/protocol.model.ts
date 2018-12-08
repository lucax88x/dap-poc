import { UUID } from '../code/uuid';
import { IProtocolInputModel } from './protocol.input-model';
import { IProtocolOutputModel } from './protocol.output-model';

export interface IProtocolModel {
  id: UUID;
  note: string;
  images: string[];
  signature: string;
  completed: boolean;
}

export function fromInput(input: IProtocolInputModel): IProtocolModel {
  return {
    id: new UUID(input.id),
    note: input.note,
    images: input.images,
    signature: input.signature,
    completed: false
  };
}

export function fromOutput(output: IProtocolOutputModel): IProtocolModel {
  return {
    id: new UUID(output.id),
    note: output.note,
    images: output.images,
    signature: output.signature,
    completed: output.completed
  };
}
