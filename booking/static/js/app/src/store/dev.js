import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

import { createLogger } from 'redux-logger';
import DevTools from '../containers/DevTools';

import rootReducer from '../reducers';

export const history = createHistory();

const configureStore = (initialState) => {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        thunk,
        createLogger(),
      ),
      DevTools.instrument(),
    ),
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const newRootReducer = require('../reducers').default;

      store.replaceReducer(newRootReducer);
    });
  }

  return store;
};

export default configureStore;
