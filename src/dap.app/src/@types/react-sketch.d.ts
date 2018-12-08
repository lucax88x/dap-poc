declare module 'react-sketch' {
  export interface ISketchFieldProps {
    width?: string;
    height?: string;
    tool?: Tools;
    lineColor?: string;
    lineWidth?: number;
    value?: string;
    defaultValue?: string;
    className?: string;
    onChange?: () => void;
  }

  interface ImageOptions {
    stretched: boolean;
    stretchedX: boolean;
    stretchedY: boolean;
    originX: string;
    originY: string;
  }

  interface ISketchJSON {
    version: string;
    background: string;
    backgroundImage: {};
    objects: {}[];
  }

  export class SketchField extends React.PureComponent<ISketchFieldProps> {
    setBackgroundFromDataUrl: (
      reader: string | ArrayBuffer | null,
      options: ImageOptions
    ) => void;

    clear: () => void;
    undo: () => void;
    redo: () => void;
    canUndo: () => boolean;
    canRedo: () => boolean;
    addText: (text: string) => void;
    toDataURL: () => string;
    toJSON: () => ISketchJSON;
  }
  export enum Tools {
    Select = 'select',
    Pencil = 'pencil',
    Circle = 'circle',
    Rectangle = 'rectangle',
    Pan = 'pan'
  }
}
