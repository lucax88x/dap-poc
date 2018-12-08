import {
  Button,
  createStyles,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { map } from 'ramda';
import React from 'react';

import { UUID } from '../code/uuid';
import { IPropertyModel } from '../models/property.model';
import { Spinner } from './spinner';

export interface IPropertyListProps {
  isOnline: boolean;
  isBusy: boolean;
  properties: IPropertyModel[];
}

export interface IPropertyListDispatches {
  searchProperties: (filter: string) => void;
  startProtocol: (id: UUID) => void;
  resumeProtocol: (id: UUID) => void;
  reviewProtocol: (id: UUID) => void;
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

class PropertyListComponent extends React.PureComponent<
  IPropertyListProps & IPropertyListDispatches & WithStyles<typeof styles>
> {
  public render() {
    const { classes, properties, isBusy, isOnline } = this.props;

    const rows = map(
      property => (
        <ListItem key={property.id.toString()} button>
          <HomeIcon color="action" />
          <ListItemText primary={property.address} />
          <ListItemSecondaryAction>
            {(!property.hasProtocol || property.hasCompletedProtocol) && (
              <Button onClick={this.onStartProtocol(property.id)}>
                start protocol
              </Button>
            )}
            {property.hasProtocol && !property.hasCompletedProtocol && (
              <Button onClick={this.onResumeProtocol(property.id)}>
                resume protocol
              </Button>
            )}
            {property.hasCompletedProtocol && (
              <Button onClick={this.onReviewProtocol(property.id)}>
                review
              </Button>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      ),
      properties
    );

    return (
      <Grid container className={classes.container}>
        <Grid container item xs={12} justify="center" alignItems="flex-end">
          <Grid item>
            <SearchIcon color="primary" />
          </Grid>
          <Grid item>
            <TextField
              label="Type here to search"
              type="search"
              margin="normal"
              disabled={!isOnline}
              onChange={this.onSearchProperties}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {isBusy ? <Spinner /> : <List>{rows}</List>}
        </Grid>
      </Grid>
    );
  }

  private onSearchProperties = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.props.searchProperties(evt.target.value);
  };

  private onStartProtocol = (id: UUID) => (evt: React.MouseEvent) => {
    this.props.startProtocol(id);
  };

  private onResumeProtocol = (id: UUID) => (evt: React.MouseEvent) => {
    this.props.resumeProtocol(id);
  };

  private onReviewProtocol = (id: UUID) => (evt: React.MouseEvent) => {
    this.props.reviewProtocol(id);
  };
}

export const PropertyList = withStyles(styles)(PropertyListComponent);
