import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import reduxThunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import * as Actions from '../actions';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import index from '../reducers'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}

export const history = createHistory();

export function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(reduxThunk, routerMiddleware(history)),
            window.devToolsExtension ? window.devToolsExtension() : f => f
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default;
            store.replaceReducer(nextRootReducer);
        });
    }

    // Since we're working with the store object directly,
    // we don't need anything fancy like thunks or bindActionCreators to dispatch an object:
    // we can just import it and dispatch it right there.

    // Call verifyAuth() almost as soon as app boots so we can update the state accordingly.
    // store.dispatch(Actions.verifyAuth());

    return store;
}
