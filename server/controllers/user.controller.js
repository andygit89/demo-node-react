import User from '../models/user.model';
var bcrypt = require('bcryptjs');
import Debug from 'debug';
const debug = Debug('user');



function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {

    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}



function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    debug(err);
    res.status(statusCode).send(err);
  };
}


/**
 * create user
 * @param req
 * @param res
 * @param next
 */
function create(req, res, next) {
  var usrObj = req.body;
  var password = usrObj.password;
  var bcrypt_password = bcrypt.hashSync( password, 10 );
  usrObj.password = bcrypt_password;
  const user = new User(usrObj);
  user.saveAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * update existing user
 * @param req
 * @param res
 * @param next
 */
function update(req, res, next) {
  const userId = req.params.userId;
  var usrObj = req.body;
  User.updateAsync({_id:userId},{$set:usrObj})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * get user list
 * @param req
 * @param res
 * @param next
 */
function list(req, res, next) {
  User.find().sort({ createdAt: -1 }).select({_id:0}).execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const userId = req.params.userId;
  user.removeAsync({_id:userId})
    .then(respondWithResult(res))
    .catch(handleError(res));
}


/**
 * Get user listbyrole.
 */
function listByRole(req, res, next) {
  User.aggregate([
    { $match: {role:'admin'} },
    {
      $project:
      {
        firstname: { $toLower: "$firstname" },
        lastname:{$toLower: "$lastname"},
        email:1,
        postcode:1,
        updatedAt : 1,
        createdAt : 1,
        address_1 : 1,
        mobileNumber : 1,
        isActive : true,
        country : 1,
        postcode : 1,
        city : 1,
        role : 1,
        address_2 : 1,
        photoUrl : 1,
        photoName : 1,
        menus : 1,
        deactivatedAt:1
      }
    },
    { $sort: {isActive: -1, firstname:1 } }

  ]).execAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export default { create, update, list, remove, listByRole };
