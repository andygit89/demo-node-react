/**
 * Created by ashish on 31/10/16.
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.session, action) {
  switch (action.type) {
    case types.CREATE_LOGIN_SUCCESS:
      return !!sessionStorage.jwt

    default:
      return state;
  }
}
