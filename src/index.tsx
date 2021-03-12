import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SnackbarProvider } from 'notistack';
import { Notistack } from 'shared/notistack/notistack';
import { SearchProvider } from 'app/common/searchProvider';

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
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          content={(key, message) => <Notistack key={key} message={message} />}
        >
          <SearchProvider>
            <App />
          </SearchProvider>
        </SnackbarProvider>
      </React.StrictMode>
    </Router>
  </Provider>,
  document.getElementById('root')
);
