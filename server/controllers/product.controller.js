/**
 * Created by ashish on 12/11/16.
 */

import Product from '../models/product.model';

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
 * create new product
 * @param req
 * @param res
 * @param next
 */
function createProduct(req, res, next) {
  var productObj = req.body;
  const product = new Product(productObj);
  product.saveAsync()
    .then(respondWithResult(res))
    .catch(handleError(res))
}

/**
 * update a product
 * @param req
 * @param res
 * @param next
 */
function update(req, res, next) {
  const id = req.params.id;
  var productObj = req.body;
  Product.updateAsync({_id:id},{$set:productObj})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * product List
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next) {

  Product.find().sort({ createdAt: -1 }).select({_id:0}).execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * delete pproduct
 * @param req
 * @param res
 * @param next
 */
function remove(req, res, next) {
  const id = req.params.id;
  Product.findByIdAndRemoveAsync(id)
    .then(()=>res.status(204).end())
    .catch(handleError(res));

}
export default {createProduct, update, list, remove };
