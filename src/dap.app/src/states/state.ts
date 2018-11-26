import { RouterState } from 'connected-react-router';

import { IPropertyListState } from './property-list.state';
import { ITopBarState } from './top-bar.state';

export interface IState {
  router: RouterState;
  topBar: ITopBarState;
  propertyList: IPropertyListState;
}

export type States = ITopBarState | IPropertyListState;
