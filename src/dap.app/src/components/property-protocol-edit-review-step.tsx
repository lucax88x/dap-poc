import {
  createStyles,
  GridList,
  GridListTile,
  Paper,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import { map } from 'ramda';
import React from 'react';
import Img from 'react-image';

import { IProtocolModel } from '../models/protocol.model';
import { Spinner } from './spinner';

export interface IPropertyProtocolEditReviewStepProps {
  protocol: IProtocolModel | null;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: '15px',
      color: theme.palette.text.primary
    }
  });

class PropertyProtocolEditReviewStepComponent extends React.PureComponent<
  IPropertyProtocolEditReviewStepProps & WithStyles<typeof styles>
> {
  public render() {
    const { classes, protocol } = this.props;

    return (
      protocol && (
        <Paper className={classes.root}>
          <Typography variant="h6">{protocol.note}</Typography>
          <Typography variant="h6">
            {this.getImagesCaption(protocol)}
          </Typography>

          {console.error('find a way to use a proper key')}
          <GridList cellHeight={160} cols={3}>
            {map(
              image => (
                <GridListTile key={image} cols={1}>
                  <Img src={image} loader={<Spinner />} />
                </GridListTile>
              ),
              protocol.images
            )}
          </GridList>
        </Paper>
      )
    );
  }

  private getImagesCaption(protocol: IProtocolModel): string {
    if (protocol.images.length === 1) return '1 picture added';

    if (protocol.images.length > 1)
      return `${protocol.images.length} pictures added`;

    return 'No pictures';
  }
}

export const PropertyProtocolEditReviewStep = withStyles(styles)(
  PropertyProtocolEditReviewStepComponent
);
