/**
 * Created by admin1 on 2/11/16.
 */
import * as types from './actionTypes';
import categoryApi from '../api/mockCategoryApi';

export function loadCategorySuccess(categories) {
  return { type: types.LOAD_CATEGORY_SUCCESS, categories };
}

export function deleteCategorySuccess(categoryId) {
  return { type: types.DELETE_CATEGORY_SUCCESS, categoryId };
}



export function loadCategory() {
  return function (dispatch) {
    return categoryApi.getAllCategory().then((categories) => {
      dispatch(loadCategorySuccess(categories));
    }).catch((error) => {
      throw(error)
    });
  }
}

export function saveCategorySuccess(category) {
  return { type: types.CREATE_CATEGORY_SUCCESS, category }
}

export function updateCategorySuccess(category) {
  return { type: types.UPDATE_CATEGORY_SUCCESS, category }
}


export function saveCategory(category) {
  return function (dispatch) {
    return categoryApi.saveCategory(category).then((savedCategory) => {
      category._id ? dispatch(updateCategorySuccess(category)) : dispatch(saveCategorySuccess(savedCategory));
    }).catch((error) => {
      throw(error)
    });
  }
}

export function deleteCategory(categoryId) {
  return function (dispatch) {
    return categoryApi.deleteCategory(categoryId).then((doc) => {
      dispatch(deleteCategorySuccess(categoryId));
    }).catch((error) => {
      throw(error)
    });
  }
}

export function hideCategory(json) {
  return function (dispatch) {
    return categoryApi.hideCategory(json).then((doc) => {
      //dispatch(deleteCategorySuccess(categoryId));
    }).catch((error) => {
      throw(error)
    });
  }
}






