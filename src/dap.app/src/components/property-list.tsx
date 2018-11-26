import {
  Button,
  CircularProgress,
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

import { IPropertyModel } from '../models/property.model';

export interface IPropertyListProps {
  isOnline: boolean;
  isBusy: boolean;
  properties: IPropertyModel[];
}

export interface IPropertyListDispatches {
  searchProperties: (filter: string) => void;
  startProtocol: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    container: {
      padding: 16
    },
    grow: {
      flexGrow: 1
    },
    center: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center'
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
            <Button onClick={this.onStartProtocol}>start protocol</Button>
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
          {isBusy ? (
            <div className={classes.center}>
              <CircularProgress />
            </div>
          ) : (
            <List>{rows}</List>
          )}
        </Grid>
      </Grid>
    );
  }

  private onSearchProperties = (evt: React.ChangeEvent<HTMLInputElement>) => {
    this.props.searchProperties(evt.target.value);
  };

  private onStartProtocol = (evt: React.MouseEvent) => {
    this.props.startProtocol();
  };
}

export const PropertyList = withStyles(styles)(PropertyListComponent);
