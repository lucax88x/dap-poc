import { UUID } from '../code/uuid';

export class ImageSketched {
  constructor(public dataUrl: string, public id: string = '') {
    console.error('find way for predictable id');
  }

  static Empty(): ImageSketched {
    return new ImageSketched('', UUID.Empty);
  }

  isEmpty() {
    return this.id === UUID.Empty;
  }
}
