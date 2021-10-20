import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import App from '../public/client/App.jsx';
import store from '../public/client/store.js'
import ReactDOM from "react-dom";
// import styles from scss/css so webpack can bundle styles
import styles from '../public/client/scss/application.scss';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

