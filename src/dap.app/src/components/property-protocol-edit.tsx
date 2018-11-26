import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import { IPropertyModel } from '../models/property.model';

export interface IPropertyProtocolEditProps {
  properties: IPropertyModel[];
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: 16
    },
    grow: {
      flexGrow: 1
    }
  });

class PropertyProtocolEditComponent extends React.PureComponent<
  IPropertyProtocolEditProps & WithStyles<typeof styles>
> {
  public render() {
    return (
      <React.Fragment>
        <Link color="white" to="/">
          back
        </Link>
      </React.Fragment>
    );
  }
}

export const PropertyProtocolEdit = withStyles(styles)(
  PropertyProtocolEditComponent
);
