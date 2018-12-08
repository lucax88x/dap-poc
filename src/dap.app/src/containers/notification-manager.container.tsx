import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Actions } from '../actions';
import { removeSnackbarAction } from '../actions/notification-manager.actions';
import { UUID } from '../code/uuid';
import {
  INotificationManagerDispatches,
  INotificationManagerProps,
  NotificationManager
} from '../components/notification-manager';
import { selectNotifications } from '../selectors/notification-manager.selectors';
import { IState } from '../states/state';

const mapStateToProps = (state: IState): INotificationManagerProps => ({
  notifications: selectNotifications(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<Actions>
): INotificationManagerDispatches => ({
  removeNotification: (key: UUID) => dispatch(removeSnackbarAction(key))
});

export const NotificationManagerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationManager);
