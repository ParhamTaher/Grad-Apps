import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import createAppStore from './store/configureAppStore';
import { PersistGate } from 'redux-persist/integration/react'



const { persistor, store } = createAppStore()

ReactDOM.render(
    <Provider store={store}>
    	<PersistGate loading={null} persistor={persistor}>
        	<App />
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);
