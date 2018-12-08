declare module 'react-reveal/Fade' {
  export interface IFadeProps {
    left?: boolean;
    top?: boolean;
  }

  export class Fade extends React.PureComponent<IFadeProps> {}

  export default Fade;
}
