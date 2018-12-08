import { connect } from 'react-redux';

import { ITopBarProps, TopBar, ITopBarDispatches } from '../components/top-bar';
import { selectIsOnline } from '../selectors/top-bar.selectors';
import { IState } from '../states/state';
import { Dispatch } from 'redux';
import { RouterAction, push } from 'connected-react-router';

const mapStateToProps = (state: IState): ITopBarProps => ({
  isOnline: selectIsOnline(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<RouterAction>
): ITopBarDispatches => ({
  titleClick: () => dispatch(push('/'))
});

export const TopBarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBar);
