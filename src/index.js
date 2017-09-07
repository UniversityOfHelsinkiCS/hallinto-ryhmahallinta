import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import store from './store'

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
    <App/>
    </Provider>
  </HashRouter>
  ,document.getElementById('root'))

registerServiceWorker()
