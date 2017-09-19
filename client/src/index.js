import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

//Development only axios helpers!
import axios from 'axios';
window.axios = axios;

//Redux Store
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  //Provider tells all the child stores there is data available
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
