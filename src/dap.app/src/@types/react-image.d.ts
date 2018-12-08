declare module 'react-image' {
  export interface IImageProps {
    src: string;
    loader: React.ReactElement<{}>;
  }

  export class Img extends React.Component<IImageProps> {}

  export default Img;
}
