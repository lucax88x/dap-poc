import { connect } from 'react-redux';

import {
  IPropertyProtocolEditProps,
  PropertyProtocolEdit
} from '../components/property-protocol-edit';
import { selectProperties } from '../selectors/property-list.selectors';
import { IState } from '../states/state';

const mapStateToProps = (state: IState): IPropertyProtocolEditProps => ({
  properties: selectProperties(state)
});

export const PropertyProtocolEditContainer = connect(mapStateToProps)(
  PropertyProtocolEdit
);
