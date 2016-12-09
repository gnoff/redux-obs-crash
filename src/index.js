import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { rootEpic, rootReducer } from './reducer'

const middleware = [createEpicMiddleware(rootEpic)]

const store = createStore(rootReducer, {}, applyMiddleware(...middleware))


ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
