import './assets/fonts/roboto/index.scss';
import './index.scss';

import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider
} from '@material-ui/core';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { spring } from 'react-motion';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { AnimatedSwitch, IAnimatedSwitchTransition } from 'react-router-transition';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { fromEvent, merge, of } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { Actions } from './actions';
import { isOfflineAction, isOnlineAction } from './actions/top-bar.actions';
import { PropertyListContainer } from './containers/property-list.container';
import { PropertyProtocolEditContainer } from './containers/property-protocol-edit.container';
import { TopBarContainer } from './containers/top-bar.container';
import { rootEpics } from './epics';
import { rootReducers } from './reducers';
import * as serviceWorker from './serviceWorker';
import { States } from './states/state';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark'
  }
});

const logger = createLogger({
  collapsed: true
});

const epicMiddleware = createEpicMiddleware<Actions, Actions, States>();
const history = createBrowserHistory();

const store: Store = createStore(
  rootReducers(history),
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), epicMiddleware, logger)
  )
);

epicMiddleware.run(rootEpics);

function mapStyles(styles: IAnimatedSwitchTransition) {
  return {
    opacity: styles.opacity,
    transform: `translateX(${styles.offset}px)`
  };
}

function glide(val: number) {
  return spring(val, {
    stiffness: 174,
    damping: 24
  });
}

const pageTransitions = {
  atEnter: {
    opacity: 0,
    offset: 100
  },
  atLeave: {
    opacity: 0,
    offset: glide(-100)
  },
  atActive: {
    opacity: 1,
    offset: glide(0)
  }
};

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <TopBarContainer />
      <ConnectedRouter history={history}>
        <AnimatedSwitch
          {...pageTransitions}
          mapStyles={mapStyles}
          className="switch-wrapper"
        >
          <Route exact={true} path="/" component={PropertyListContainer} />
          <Route
            path="/protocol/create"
            component={PropertyProtocolEditContainer}
          />
        </AnimatedSwitch>
      </ConnectedRouter>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

merge(
  fromEvent(window, 'offline').pipe(mapTo(false)),
  fromEvent(window, 'online').pipe(mapTo(true)),
  of(navigator.onLine)
).subscribe(online =>
  store.dispatch(online ? isOnlineAction() : isOfflineAction())
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
