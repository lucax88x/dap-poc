import { InjectedNotistackProps, OptionsObject, withSnackbar } from 'notistack';
import { forEach, merge } from 'ramda';
import React from 'react';

import { UUID } from '../code/uuid';
import { NotificationModel } from '../models/notification.model';

export interface INotificationManagerProps {
  notifications: NotificationModel[];
}

export interface INotificationManagerDispatches {
  removeNotification: (key: UUID) => void;
}

type NotificationManagerProps = INotificationManagerProps &
  INotificationManagerDispatches &
  InjectedNotistackProps;

class NotificationManagerComponent extends React.PureComponent<
  NotificationManagerProps
> {
  private optionDefaults: OptionsObject;

  /**
   *
   */
  constructor(props: NotificationManagerProps) {
    super(props);

    this.optionDefaults = {
      variant: 'info'
    };
  }

  render() {
    return null;
  }

  componentWillReceiveProps(nextProps: NotificationManagerProps) {
    const { notifications, enqueueSnackbar } = nextProps;

    forEach(notification => {
      // // If notification already displayed, abort
      // if (displayed.indexOf(notification.key) > -1) return;
      // Display notification using notistack

      const options = merge(this.optionDefaults, notification.options);
      enqueueSnackbar(notification.message, options);

      this.removeSnackbar(notification.key);
    }, notifications);
  }

  private removeSnackbar(key: UUID) {
    this.props.removeNotification(key);
  }
}

export const NotificationManager = withSnackbar(NotificationManagerComponent);
