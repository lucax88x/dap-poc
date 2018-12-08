import {
  Button,
  createStyles,
  Grid,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import React from 'react';
import Fade from 'react-reveal/Fade';

import { IPropertyModel } from '../models/property.model';
import { IProtocolModel } from '../models/protocol.model';
import { PropertyProtocolEditReviewStep } from './property-protocol-edit-review-step';

export interface IPropertyProtocolReviewProps {
  property: IPropertyModel | null;
  protocol: IProtocolModel | null;
}

export interface IPropertyProtocolReviewDispatches {
  goToHome: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
      minHeight: '50px'
    },
    buttons: {
      marginTop: theme.spacing.unit
    }
  });

class PropertyProtocolReviewComponent extends React.PureComponent<
  IPropertyProtocolReviewProps &
    IPropertyProtocolReviewDispatches &
    WithStyles<typeof styles>
> {
  public render() {
    const { classes, protocol, property } = this.props;

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
        <PropertyProtocolEditReviewStep protocol={protocol} />
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="secondary"
            onClick={this.handleBack}
          >
            <NavigateBeforeIcon />
            Back
          </Button>
        </div>
      </React.Fragment>
    );
  }

  private handleBack = () => {
    this.props.goToHome();
  };
}

export const PropertyProtocolReview = withStyles(styles)(
  PropertyProtocolReviewComponent
);
