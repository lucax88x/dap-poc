import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Actions } from '../actions';
import {
  goToStepAction,
  previousStepAction,
  tryCompleteProtocolAction,
  trySaveStepAction
} from '../actions/property-protocol-edit.actions';
import { Routes } from '../code/routes';
import {
  IPropertyProtocolEditDispatches,
  IPropertyProtocolEditProps,
  PropertyProtocolEdit
} from '../components/property-protocol-edit';
import {
  selectActiveStep,
  selectHasStarted,
  selectIsBusy,
  selectProperty,
  selectProtocol,
  selectSteps
} from '../selectors/property-protocol-edit.selectors';
import { selectIsOnline } from '../selectors/top-bar.selectors';
import { IState } from '../states/state';

const mapStateToProps = (state: IState): IPropertyProtocolEditProps => ({
  isOnline: selectIsOnline(state),

  activeStep: selectActiveStep(state),
  steps: selectSteps(state),

  hasStarted: selectHasStarted(state),

  isBusy: selectIsBusy(state),
  property: selectProperty(state),
  protocol: selectProtocol(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<Actions>
): IPropertyProtocolEditDispatches => ({
  goToHome: () => dispatch(push(Routes.Home)),
  previousStep: () => dispatch(previousStepAction()),
  trySaveStep: model => dispatch(trySaveStepAction(model)),
  tryCompleteProtocol: model => dispatch(tryCompleteProtocolAction(model)),
  goToStep: index => dispatch(goToStepAction(index))
});

export const PropertyProtocolEditContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyProtocolEdit);
