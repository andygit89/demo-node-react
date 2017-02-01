/**
 * Created by admin1 on 2/11/16.
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function categoryReducer(state = initialState.categories, action) {
  switch (action.type) {
    case types.LOAD_CATEGORY_SUCCESS:
      return action.categories;

    case types.CREATE_CATEGORY_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.category)
      ];

    case types.UPDATE_CATEGORY_SUCCESS:
      return [
        ...state.filter(category => category._id !== action.category._id), Object.assign({}, action.category)
      ]
    case types.DELETE_CATEGORY_SUCCESS:
      return [
        ...state.filter(category => category._id !== action.categoryId)
      ]

    default:
      return state;
  }
}
