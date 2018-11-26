import { produce } from 'immer';

import { TopBarActions } from '../actions';
import { IS_OFFLINE, IS_ONLINE } from '../actions/top-bar.actions';
import { ITopBarState } from '../states/top-bar.state';

export const topbarState: ITopBarState = {
  isOnline: false
};

export const topBarReducers = (
  state = topbarState,
  action: TopBarActions
): ITopBarState =>
  produce(state, draft => {
    switch (action.type) {
      case IS_ONLINE:
        draft.isOnline = true;
        return;
      case IS_OFFLINE:
        draft.isOnline = false;
        return;
      default:
        return state;
    }
  });
