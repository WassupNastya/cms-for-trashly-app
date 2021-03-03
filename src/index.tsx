import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'notistack';

import { store } from './core/store';
import { App } from './app';

import './base.scss';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <React.StrictMode>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <App />
        </SnackbarProvider>
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);
