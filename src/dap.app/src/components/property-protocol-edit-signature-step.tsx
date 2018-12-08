import {
  createStyles,
  IconButton,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import React from 'react';
import { SketchField, Tools } from 'react-sketch';

export interface IPropertyProtocolEditSignatureStepProps {
  signature: string;
}

export interface IPropertyProtocolEditSignatureStepDispatches {
  addSignature: (signature: string) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    signatureContainer: {
      border: '1px solid',
      borderRadius: '5px',
      borderColor: theme.palette.primary.main
    }
  });

class PropertyProtocolEditSignatureStepComponent extends React.PureComponent<
  IPropertyProtocolEditSignatureStepProps &
    IPropertyProtocolEditSignatureStepDispatches &
    WithStyles<typeof styles>
> {
  private sketch: SketchField | null;

  public render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <SketchField
          ref={c => (this.sketch = c)}
          width="600px"
          height="400px"
          tool={Tools.Pencil}
          lineColor="black"
          lineWidth={3}
          className={classes.signatureContainer}
        />
        <IconButton onClick={this.handleClear}>
          <ClearIcon />
        </IconButton>
        <IconButton onClick={this.handleConfirm}>
          <CheckIcon />
        </IconButton>
      </div>
    );
  }

  componentDidMount() {
    if (this.props.signature.length > 0) {
      if (!!this.sketch) {
        this.sketch.setBackgroundFromDataUrl(this.props.signature, {
          stretched: true,
          stretchedX: true,
          stretchedY: true,
          originX: 'left',
          originY: 'top'
        });
      }
    }
  }

  private handleClear = () => {
    if (!!this.sketch) {
      this.sketch.clear();
    }
  };

  private handleConfirm = () => {
    if (!!this.sketch) {
      this.props.addSignature(this.sketch.toDataURL());
    }
  };
}

export const PropertyProtocolEditSignatureStep = withStyles(styles)(
  PropertyProtocolEditSignatureStepComponent
);
