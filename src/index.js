import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import combineReducer from './reducers'

const store = createStore(combineReducer);

render (
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
);
