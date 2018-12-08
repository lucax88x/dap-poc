import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Actions } from '../actions';
import { Routes } from '../code/routes';
import {
  IPropertyProtocolReviewDispatches,
  IPropertyProtocolReviewProps,
  PropertyProtocolReview
} from '../components/property-protocol-review';
import {
  selectProperty,
  selectProtocol
} from '../selectors/property-protocol-review.selectors';
import { IState } from '../states/state';

const mapStateToProps = (state: IState): IPropertyProtocolReviewProps => ({
  property: selectProperty(state),
  protocol: selectProtocol(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<Actions>
): IPropertyProtocolReviewDispatches => ({
  goToHome: () => dispatch(push(Routes.Home))
});

export const PropertyProtocolReviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyProtocolReview);
