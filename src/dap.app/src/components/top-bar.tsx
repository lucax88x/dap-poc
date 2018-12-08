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
export interface ITopBarDispatches {
  titleClick: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    title: {
      cursor: 'pointer'
    }
  });

class TopBarComponent extends React.PureComponent<
  ITopBarProps & ITopBarDispatches & WithStyles<typeof styles>
> {
  public render() {
    const { classes, isOnline } = this.props;

    return (
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.title}
            onClick={this.handleTitleClick}
          >
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

  private handleTitleClick = () => {
    this.props.titleClick();
  };
}

export const TopBar = withStyles(styles)(TopBarComponent);
