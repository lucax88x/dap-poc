import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Actions } from '../actions';
import { getPropertiesAction } from '../actions/property-list.actions';
import { Routes } from '../code/routes';
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
  dispatch: Dispatch<Actions>
): IPropertyListDispatches => ({
  searchProperties: (filter: string) => dispatch(getPropertiesAction(filter)),
  startProtocol: id =>
    dispatch(
      push(
        Routes.MapTo(Routes.Protocol.Start, {
          propertyId: id.toString()
        })
      )
    ),
  resumeProtocol: id =>
    dispatch(
      push(
        Routes.MapTo(Routes.Protocol.Resume, {
          propertyId: id.toString()
        })
      )
    ),
  reviewProtocol: id =>
    dispatch(
      push(
        Routes.MapTo(Routes.Protocol.Review, {
          propertyId: id.toString()
        })
      )
    )
});

export const PropertyListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PropertyList);
