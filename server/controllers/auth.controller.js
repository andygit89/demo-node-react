import jwt from 'jsonwebtoken';
import * as config from '../../config/env';
import User from '../models/user.model';
var bcrypt = require('bcryptjs');
import Debug from 'debug';
const debug = Debug('auth');


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
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  let usrObj = {};
  usrObj['email'] = req.body.email;
  usrObj['password'] = req.body.password;
  User.findOneAsync({email: usrObj.email})
    .then(user => {
      if (!user) {
        res.status(401).json({ success: false, message: 'Authentication failed. User not found.' });
        return;
      }
        // check if password matches
      let bcrypt_password_matched = bcrypt.compareSync( usrObj.password, user.password );
      if (! bcrypt_password_matched) {
        res.status(401).json({ success: false, message: 'Authentication failed. Wrong password.' });
        return;
      }
      var usrJson ={};
      usrJson['_id']= user._id;
      usrJson['email']= user.email;
      usrJson['username'] = user.username;
      const token = jwt.sign(usrJson, config.JWTSECRET);
      res.status(200).json({success:true,token, username: user.username});


    })
    .catch(handleError(res));
}


export default { login };
