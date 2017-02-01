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
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
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
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const userId = req.params.userId;
  var usrObj = req.body;
  User.updateAsync({_id:userId},{$set:usrObj})
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
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

export default { create, update, list, remove };
