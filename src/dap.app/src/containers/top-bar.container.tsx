import { connect } from 'react-redux';

import { ITopBarProps, TopBar } from '../components/top-bar';
import { selectIsOnline } from '../selectors/top-bar.selectors';
import { IState } from '../states/state';

const mapStateToProps = (state: IState): ITopBarProps => ({
  isOnline: selectIsOnline(state)
});

export const TopBarContainer = connect(mapStateToProps)(TopBar);
