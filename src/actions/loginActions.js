/**
 * Created by ashish on 31/10/16.
 */
import * as types from './actionTypes';
import loginApi from '../api/mockLoginApi';
export function createLoginSuccess(login) {
  return { type: types.CREATE_LOGIN_SUCCESS, login }
}


export function createLogin(login) {
  return function (dispatch) {
    return loginApi.login(login).then((response) => {
      sessionStorage.setItem('jwt', response.token);
      dispatch(createLoginSuccess());
    }).catch((error) => {
      throw(error)
    });
  }
}
