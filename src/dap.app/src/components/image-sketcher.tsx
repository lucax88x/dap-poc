import {
  AppBar,
  Button,
  createStyles,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Slide,
  TextField,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import RedoIcon from '@material-ui/icons/Redo';
import UndoIcon from '@material-ui/icons/Undo';
import ColorPicker from 'material-ui-color-picker';
import React from 'react';
import { SketchField, Tools } from 'react-sketch';

import { ImageSketched } from '../models/image-sketched';

function Transition(props: {}) {
  return <Slide direction="up" {...props} />;
}

export interface IImageSketcherState {
  type: Tools;
  color: string;

  canUndo: boolean;
  canRedo: boolean;

  text: string;
}

export interface IImageSketcherProps {
  isOpen: boolean;
  image: ImageSketched;
}

export interface IImageSketcherDispatches {
  close: () => void;
  confirm: (sketched: ImageSketched) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative'
    },
    flex: {
      flex: 1
    }
  });

class ImageSketcherComponent extends React.PureComponent<
  IImageSketcherProps & IImageSketcherDispatches & WithStyles<typeof styles>,
  IImageSketcherState
> {
  private sketch: SketchField | null;

  constructor(
    props: IImageSketcherProps &
      IImageSketcherDispatches &
      WithStyles<typeof styles>
  ) {
    super(props);

    this.state = {
      type: Tools.Pencil,
      color: '#000',

      canUndo: false,
      canRedo: false,

      text: ''
    };
  }

  public render() {
    const { canRedo, canUndo, color, type, text } = this.state;
    const { classes, isOpen } = this.props;

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={this.handleConfirm}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.handleConfirm}
              aria-label="Close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              Edit your image
            </Typography>
            <Button color="inherit" onClick={this.handleConfirm}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid
            container
            item
            direction="row"
            justify="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="type">Type</InputLabel>
                <Select
                  value={type}
                  onChange={this.handleTypeChange}
                  input={<Input name="type" id="type" />}
                >
                  <MenuItem value={Tools.Pencil}>Pencil</MenuItem>
                  <MenuItem value={Tools.Select}>Select</MenuItem>
                  <MenuItem value={Tools.Rectangle}>Rectangle</MenuItem>
                  <MenuItem value={Tools.Circle}>Circle</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <ColorPicker
                name="color"
                defaultValue="#000"
                onChange={this.handleColorChange}
              />
            </Grid>
            <Grid item>
              <IconButton
                aria-label="Undo"
                onClick={this.handleUndo}
                disabled={!canUndo}
              >
                <UndoIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                aria-label="Redo"
                onClick={this.handleRedo}
                disabled={!canRedo}
              >
                <RedoIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <TextField
                label="Text"
                value={text}
                onChange={this.handleTextChange}
                margin="normal"
              />

              <IconButton aria-label="AddText" onClick={this.handleAddText}>
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>

          <Grid item>
            <SketchField
              ref={c => (this.sketch = c)}
              width="1024px"
              height="768px"
              tool={type}
              lineColor={color}
              lineWidth={3}
              onChange={this.handleSketchChange}
            />
          </Grid>
        </Grid>
      </Dialog>
    );
  }

  componentDidUpdate(prevProps: IImageSketcherProps) {
    if (this.props.isOpen && prevProps.image !== this.props.image) {
      setTimeout(() => {
        console.error('figure out why?');

        if (!!this.sketch) {
          this.sketch.setBackgroundFromDataUrl(this.props.image.dataUrl, {
            stretched: true,
            stretchedX: true,
            stretchedY: true,
            originX: 'left',
            originY: 'top'
          });
        }
      });
    }
  }

  private handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ type: event.target.value as Tools });
  };

  private handleColorChange = (color: string) => {
    this.setState({ color });
  };

  private handleUndo = () => {
    if (!!this.sketch) {
      this.sketch.undo();
      this.setState({
        canUndo: this.sketch.canUndo(),
        canRedo: this.sketch.canRedo()
      });
    }
  };

  private handleRedo = () => {
    if (!!this.sketch) {
      this.sketch.redo();
      this.setState({
        canUndo: this.sketch.canUndo(),
        canRedo: this.sketch.canRedo()
      });
    }
  };

  private handleSketchChange = () => {
    if (!!this.sketch) {
      let prev = this.state.canUndo;
      let now = this.sketch.canUndo();
      if (prev !== now) {
        this.setState({ canUndo: now });
      }
    }
  };

  private handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: event.target.value });
  };

  private handleAddText = () => {
    if (!!this.sketch) {
      this.sketch.addText(this.state.text);
    }
    this.setState({ text: '' });
  };

  handleClose = () => {
    this.props.close();
  };

  handleConfirm = () => {
    if (!!this.sketch) {
      console.error('find a way to have a predictable id from base64');
      this.props.confirm(
        new ImageSketched(this.sketch.toDataURL(), this.props.image.id)
      );
    }
  };
}

export const ImageSketcher = withStyles(styles)(ImageSketcherComponent);
