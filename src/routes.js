import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import LoginPage from './components/login/LoginPage';
import HomeLayout from './components/layout/homeLayout';
import LoginLayout from './components/layout/loginLayout';
import Welcome from './components/common/welcome';
import ProductPage from './components/Product/ProductPage';
import CategoryPage from './components/Category/CategoryPage';
import ManageCategoryPage from './components/Category/ManageCategoryPage';

export default (
  <Route path="/admin" component={App}>
    <Route  component={HomeLayout}>
      <IndexRoute component={Welcome} />
      <Route path="/admin/product" component={ProductPage} />
      <Route path="/admin/category" component={CategoryPage} />
      <Route path="/admin/manageCategory" component={ManageCategoryPage} />
      <Route path="/admin/manageCategory/:id" component={ManageCategoryPage} />
    </Route>
    <Route component={LoginLayout}>
      <Route path="/login" component={LoginPage} />
    </Route>
  </Route>

);


function requireAuth(nextState, replace) {
  if (!sessionStorage.jwt) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
