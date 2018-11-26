import { push, RouterAction } from 'connected-react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { PropertyListActions } from '../actions';
import { getPropertiesAction } from '../actions/property-list.actions';
import {
  IPropertyListDispatches,
  IPropertyListProps,
  PropertyList
} from '../components/property-list';
import {
  selectIsBusy,
  selectProperties
} from '../selectors/property-list.selectors';
import { selectIsOnline } from '../selectors/top-bar.selectors';
import { IState } from '../states/state';

const mapStateToProps = (state: IState): IPropertyListProps => ({
  isOnline: selectIsOnline(state),
  isBusy: selectIsBusy(state),
  properties: selectProperties(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<PropertyListActions | RouterAction>
): IPropertyListDispatches => ({
  searchProperties: (filter: string) => dispatch(getPropertiesAction(filter)),
  startProtocol: () => dispatch(push('/protocol/create'))
});

export const PropertyListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyList);
