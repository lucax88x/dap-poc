import {
  createStyles,
  GridList,
  GridListTile,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core';
import map from 'ramda/es/map';
import React from 'react';
import Img from 'react-image';

import { UUID } from '../code/uuid';
import { ImageSketched } from '../models/image-sketched';
import { ImagePicker } from './image-picker';
import { ImageSketcher } from './image-sketcher';
import { Spinner } from './spinner';

interface IPropertyProtocolEditImagesStepState {
  isImageSketcherOpen: boolean;
  toSketchImage: ImageSketched;
}

export interface IPropertyProtocolEditImagesStepProps {
  images: ImageSketched[];
}

export interface IPropertyProtocolEditImagesStepDispatches {
  addImage: (image: ImageSketched) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden'
    },
    gridList: {
      width: '100%'
    },
    addTileContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    addTileContent: {
      width: '30%',
      border: '1px solid',
      borderColor: theme.palette.primary.main
    }
  });

class PropertyProtocolEditImagesStepComponent extends React.PureComponent<
  IPropertyProtocolEditImagesStepProps &
    IPropertyProtocolEditImagesStepDispatches &
    WithStyles<typeof styles>,
  IPropertyProtocolEditImagesStepState
> {
  constructor(
    props: IPropertyProtocolEditImagesStepProps &
      IPropertyProtocolEditImagesStepDispatches &
      WithStyles<typeof styles>
  ) {
    super(props);

    this.state = {
      isImageSketcherOpen: false,
      toSketchImage: ImageSketched.Empty()
    };
  }

  public render() {
    const { isImageSketcherOpen, toSketchImage } = this.state;
    const { classes, images } = this.props;

    return (
      <div className={classes.root}>
        <GridList cellHeight={160} className={classes.gridList} cols={3}>
          {map(
            image => (
              <GridListTile
                key={image.id}
                cols={1}
                onDoubleClick={this.handleModifyImage(image)}
              >
                <Img src={image.dataUrl} loader={<Spinner />} />
              </GridListTile>
            ),
            images
          )}
          <GridListTile key="image-picker" cols={1}>
            <div className={classes.addTileContainer}>
              <div className={classes.addTileContent}>
                <ImagePicker add={this.handleAddImage} />
              </div>
            </div>
          </GridListTile>
        </GridList>
        <ImageSketcher
          image={toSketchImage}
          isOpen={isImageSketcherOpen}
          close={this.handleImageSketcherClose}
          confirm={this.handleImageSketcherConfirm}
        />
      </div>
    );
  }

  private handleModifyImage = (img: ImageSketched) => () => {
    this.setState({ isImageSketcherOpen: true, toSketchImage: img });
  };

  private handleAddImage = (dataUrl: string) => {
    console.error('find way to have a predictable id from dataurl');
    this.setState({
      isImageSketcherOpen: true,
      toSketchImage: new ImageSketched(dataUrl, UUID.Generate().toString())
    });
  };

  private handleImageSketcherClose = () => {
    this.setState({
      isImageSketcherOpen: false,
      toSketchImage: ImageSketched.Empty()
    });
  };

  private handleImageSketcherConfirm = (sketched: ImageSketched) => {
    this.setState({
      isImageSketcherOpen: false,
      toSketchImage: ImageSketched.Empty()
    });

    this.props.addImage(sketched);
  };
}

export const PropertyProtocolEditImagesStep = withStyles(styles)(
  PropertyProtocolEditImagesStepComponent
);
