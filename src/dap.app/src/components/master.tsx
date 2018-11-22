import {
  AppBar,
  createStyles,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  WithStyles,
  withStyles
} from '@material-ui/core';
import CloudIcon from '@material-ui/icons/Cloud';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1
    }
  });

class MasterComponent extends React.PureComponent<WithStyles<typeof styles>> {
  public render() {
    const { children, classes } = this.props;

    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Welcome to Garaio REM DAP proof of concept
            </Typography>
            <IconButton color="inherit">
              <CloudIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        {children}
      </React.Fragment>
    );
  }
}

export const Master = withStyles(styles)(MasterComponent);
