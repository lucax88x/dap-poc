import './assets/fonts/roboto/index.scss';

import {
  createMuiTheme,
  CssBaseline,
  MuiThemeProvider
} from '@material-ui/core';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { applyMiddleware, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import { Actions } from './actions';
import { Master } from './components/master';
import { PropertyListContainer } from './containers/property-list.container';
import { PropertyProtocolEditContainer } from './containers/property-protocol-edit.container';
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

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Master>
        <ConnectedRouter history={history}>
          <Switch>
            <Route exact={true} path="/" component={PropertyListContainer} />
            <Route
              path="/protocol/create"
              component={PropertyProtocolEditContainer}
            />
          </Switch>
        </ConnectedRouter>
      </Master>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
