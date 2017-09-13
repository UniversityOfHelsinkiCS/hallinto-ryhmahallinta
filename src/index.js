import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import App from './App';
import store from './store'

/*
import {assignTeacherToGroup} from './services'
assignTeacherToGroup({
    htunnus: "RAJANI_C",
  }, 'CSM11002-2017-S-1',1)
*/

ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
    <App/>
    </Provider>
  </HashRouter>
  ,document.getElementById('root'))

registerServiceWorker()