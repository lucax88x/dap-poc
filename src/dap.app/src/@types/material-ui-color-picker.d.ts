declare module 'material-ui-color-picker' {
  export interface IColorPickerProps {
    name: string;
    defaultValue: string;
    onChange: (color: string) => void;
  }

  export class ColorPicker extends React.PureComponent<IColorPickerProps> {}

  export default ColorPicker;
}
