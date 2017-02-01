import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import {loadCategory} from './actions/categoryActions';
import './styles/styles.css'; // Webpack can import CSS files too !
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'


const store = configureStore();
//store.dispatch(loadCategory());
render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
);
