/**
 * Created by admin1 on 2/11/16.
 */
import Category from '../models/category.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}



function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    res.status(statusCode).json(err);
  }
}


/**
 * create new category
 * @param req
 * @param res
 * @param next
 */
function createCategory(req, res, next) {
  var categoryObj = req.body;
  const category = new Category(categoryObj);
  category.saveAsync()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

/**
 * update a category
 * @param req
 * @param res
 * @param next
 */
function update(req, res, next) {
  const id = req.params.id;
  var categoryObj = req.body;
  Category.updateAsync({_id:id},{$set:categoryObj})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Category List
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next) {

  Category.find().sort({ createdAt: -1 }).execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Delete Category
 * @param req
 * @param res
 * @param next
 */
function remove(req, res, next) {
  const id = req.params.id;
  Category.findByIdAndRemoveAsync(id)
    .then((data)=>res.status(200).json(data))
    .catch(handleError(res));

}
export default {createCategory, update, list, remove };
