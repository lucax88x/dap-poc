import {
  Button,
  Chip,
  createStyles,
  Grid,
  Step,
  StepButton,
  Stepper,
  TextField,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import HomeIcon from '@material-ui/icons/Home';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { findIndex, map, update } from 'ramda';
import React from 'react';
import Fade from 'react-reveal/Fade';

import { UUID } from '../code/uuid';
import { ImageSketched } from '../models/image-sketched';
import { IPropertyModel } from '../models/property.model';
import { IProtocolInputModel } from '../models/protocol.input-model';
import { IProtocolModel } from '../models/protocol.model';
import { PropertyProtocolEditImagesStep } from './property-protocol-edit-images-step';
import { PropertyProtocolEditReviewStep } from './property-protocol-edit-review-step';
import { PropertyProtocolEditSignatureStep } from './property-protocol-edit-signature-step';
import { Spinner } from './spinner';

interface IPropertyProtocolEditState {
  id: UUID;
  note: string;
  images: ImageSketched[];
  signature: string;
}

export interface IPropertyProtocolEditProps {
  isOnline: boolean;

  steps: string[];
  activeStep: number;

  hasStarted: boolean;

  isBusy: boolean;
  property: IPropertyModel | null;
  protocol: IProtocolModel | null;
}

export interface IPropertyProtocolEditDispatches {
  goToHome: () => void;
  previousStep: () => void;
  trySaveStep: (model: IProtocolInputModel) => void;
  tryCompleteProtocol: (model: IProtocolInputModel) => void;
  goToStep: (index: number) => void;
}

const styles = (theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
      minHeight: '50px'
    },
    stepper: {
      marginTop: theme.spacing.unit * 2
    },
    buttons: {
      marginTop: theme.spacing.unit,
      display: 'flex',
      justifyContent: 'space-evenly'
    },
    stepContent: {
      marginTop: theme.spacing.unit,
      paddingLeft: 16,
      paddingRight: 16
    }
  });

class PropertyProtocolEditComponent extends React.PureComponent<
  IPropertyProtocolEditProps &
    IPropertyProtocolEditDispatches &
    WithStyles<typeof styles>,
  IPropertyProtocolEditState
> {
  constructor(
    props: IPropertyProtocolEditProps &
      IPropertyProtocolEditDispatches &
      WithStyles<typeof styles>
  ) {
    super(props);

    this.state = { id: new UUID(), note: '', images: [], signature: '' };
  }

  public render() {
    const {
      classes,
      steps,
      activeStep,
      isBusy,
      property,
      protocol,
      isOnline,
      hasStarted
    } = this.props;

    return (
      <React.Fragment>
        <Grid
          container
          className={classes.title}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <HomeIcon color="primary" />
          <Fade top>
            <Typography variant="h5">
              {!!property && property.address}
            </Typography>
          </Fade>
        </Grid>
        <Stepper nonLinear className={classes.stepper} activeStep={activeStep}>
          {steps.map((step, index) => (
            <Step key={step} disabled={!hasStarted}>
              <StepButton onClick={this.handleStep(index)}>{step}</StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          <div>
            <div className={classes.stepContent}>
              {isBusy && <Spinner />}

              {!isBusy && activeStep === 0 && (
                <TextField
                  placeholder="Type your note here"
                  multiline={true}
                  rows={6}
                  value={this.state.note}
                  onChange={this.handleNoteChange}
                  fullWidth={true}
                  rowsMax={10}
                />
              )}
              {!isBusy && activeStep === 1 && (
                <PropertyProtocolEditImagesStep
                  images={this.state.images}
                  addImage={this.handleAddImage}
                />
              )}
              {!isBusy && activeStep === 2 && (
                <PropertyProtocolEditSignatureStep
                  signature={this.state.signature}
                  addSignature={this.handleSignatureChange}
                />
              )}
              {!isBusy && activeStep === 3 && (
                <PropertyProtocolEditReviewStep
                  protocol={this.props.protocol}
                />
              )}
            </div>

            <div className={classes.buttons}>
              <Button
                variant="contained"
                color="secondary"
                onClick={this.handlePrevious}
              >
                <NavigateBeforeIcon />
                Back
              </Button>
              {activeStep !== steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                >
                  Next
                  <NavigateNextIcon />
                </Button>
              ) : (
                <>
                  {!isOnline && (
                    <Chip
                      label="You can't send while off-line"
                      color="primary"
                      deleteIcon={undefined}
                      onDelete={undefined}
                      variant="outlined"
                    />
                  )}
                  {protocol && !protocol.completed && (
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={!isOnline}
                      onClick={this.handleComplete}
                    >
                      Complete
                      <CheckIcon />
                    </Button>
                  )}
                  {protocol && protocol.completed && (
                    <Button variant="contained" color="primary" disabled={true}>
                      Completed!
                      <CheckIcon />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }

  static getDerivedStateFromProps(
    props: IPropertyProtocolEditProps,
    state: IPropertyProtocolEditState
  ) {
    if (props.protocol && !props.protocol.id.equals(state.id)) {
      return {
        id: props.protocol.id,
        note: props.protocol.note,
        images: map(
          i => new ImageSketched(i, UUID.Generate().toString()),
          props.protocol.images
        ),
        signature: props.protocol.signature
      };
    }
    return null;
  }

  private handleNoteChange = (event: React.ChangeEvent<{ value: string }>) => {
    this.setState({ note: event.currentTarget.value });
  };

  private handleAddImage = (img: ImageSketched) => {
    const toUpdateImageIdx = findIndex(i => i.id === img.id, this.state.images);

    if (toUpdateImageIdx === -1) {
      this.setState({ images: [...this.state.images, img] });
    } else {
      this.setState({
        images: update(toUpdateImageIdx, img, this.state.images)
      });
    }
  };

  private handleSignatureChange = (signature: string) => {
    this.setState({ signature });
  };

  private handlePrevious = () => {
    if (this.props.activeStep === 0) {
      this.props.goToHome();
    } else {
      this.props.previousStep();
    }
  };

  private handleNext = () => {
    if (!!this.props.property) {
      this.props.trySaveStep({
        id: this.state.id.toString(),
        propertyId: this.props.property.id.toString(),
        note: this.state.note,
        images: map(i => i.dataUrl, this.state.images),
        signature: this.state.signature
      });
    }
  };

  private handleComplete = () => {
    if (!!this.props.property) {
      this.props.tryCompleteProtocol({
        id: this.state.id.toString(),
        propertyId: this.props.property.id.toString(),
        note: this.state.note,
        images: map(i => i.dataUrl, this.state.images),
        signature: this.state.signature
      });
    }
  };

  private handleStep = (index: number) => (evt: React.MouseEvent) => {
    this.props.goToStep(index);
  };
}

export const PropertyProtocolEdit = withStyles(styles)(
  PropertyProtocolEditComponent
);
