import {
  AppBar,
  createStyles,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import CloudOffIcon from '@material-ui/icons/CloudOff';
import React from 'react';

export interface ITopBarProps {
  isOnline: boolean;
}

const styles = (theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    }
  });

class TopBarComponent extends React.PureComponent<
  ITopBarProps & WithStyles<typeof styles>
> {
  public render() {
    const { classes, isOnline } = this.props;

    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Welcome to Garaio REM DAP proof of concept
          </Typography>
          {isOnline ? (
            <CloudDoneIcon color="action" />
          ) : (
            <CloudOffIcon color="error" />
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export const TopBar = withStyles(styles)(TopBarComponent);
