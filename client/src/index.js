import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';

//Redux Store
const store = createStore(reducers, {}, applyMiddleware());

ReactDOM.render(
  //Provider tells all the child stores there is data available
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
