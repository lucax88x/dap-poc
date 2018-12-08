import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';

import { isString } from '../code/is';
import { Spinner } from './spinner';

interface IImagePickerState {
  isBusy: boolean;
}

export interface IImagePickerProps {
  add: (base64: string) => void;
}

const center = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const styles = (theme: Theme) =>
  createStyles({
    center: {
      ...center
    },
    filePicker: {
      width: '1px',
      height: '1px',
      opacity: 0,
      overflow: 'hidden',
      zIndex: -1
    },
    filePickerLabel: {
      ...center,
      color: theme.palette.primary.main,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      cursor: 'pointer'
    }
  });

class ImagePickerComponent extends React.PureComponent<
  IImagePickerProps & WithStyles<typeof styles>,
  IImagePickerState
> {
  state = { isBusy: false };

  public render() {
    const { isBusy } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.center}>
        <input
          id="file-sketcher"
          type="file"
          accept="image/*"
          capture="camera"
          className={classes.filePicker}
          onChange={this.handleFileChange}
        />

        {!isBusy && (
          <label htmlFor="file-sketcher" className={classes.filePickerLabel}>
            <AddIcon />
            Add
          </label>
        )}

        {isBusy && <Spinner />}
      </div>
    );
  }

  private handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { files } = target;

    if (files && files[0]) {
      var reader = new FileReader();

      reader.onloadstart = () => this.setState({ isBusy: true });

      reader.onload = () => {
        this.setState({
          isBusy: false
        });

        if (isString(reader.result)) {
          console.log(reader.result);
          this.props.add(reader.result);
        }
      };

      reader.readAsDataURL(files[0]);
    }
  };
}

export const ImagePicker = withStyles(styles)(ImagePickerComponent);
