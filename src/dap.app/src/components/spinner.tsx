import {
  CircularProgress,
  createStyles,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core';
import React from 'react';

const styles = (theme: Theme) =>
  createStyles({
    center: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center'
    }
  });

export const Spinner = withStyles(styles)(
  (props: WithStyles<typeof styles>) => (
    <div className={props.classes.center}>
      <CircularProgress />
    </div>
  )
);
