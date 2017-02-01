import User from '../models/user.model';
import bcrypt from 'bcryptjs';
import Debug from 'debug';
const debug = Debug('user');
import crypto from 'crypto';
import async from 'async';
import nodemailer from 'nodemailer';



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


/**
 * Not in use
 * Forgot Password.
 * @returns {User}
 */
function forgotPassword(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
     let p =  User.findOne({ email: req.body.email, isActive:true }).lean().execAsync()
        .then((user)=>{
        if (!user) {
        p.cancel();
        res.status(400).json({success: false, message:"User not found."});
        return;
      }
      let  usrObj = {};
      usrObj.forgotPwdToken = token;
      usrObj.forgotPwdExpire = Date.now() + 3600000; // 1 hour
      usrObj.email = user.email;
      usrObj.firstname = user.firstname;
      usrObj.lastname = user.lastname;

      //const userObj = new User(usrObj);
      return User.updateAsync({_id:user._id},{$set: usrObj});

      })
      .then((doc)=>{
        done(null, token, usrObj);

      })
      .catch(handleError(res))

    },
    function(token, user, done) {

      Email.findOne({key:'ResetPassword'}).execAsync()
        .then((doc)=>{
        let template = doc.content;
      debug("Hello"+JSON.stringify(user.firstname));
      let linkHtml = 'http://' + req.headers.host + '/reset/' + token;
      let link = '<a href=' + linkHtml + '>' + linkHtml + '</a>';

      if (template.search(/{{%%LINK%%}}/i) != -1 ) {
        template = template.replace(/{{%%LINK%%}}/i, link);
      }

      if(template.search(/{{%%FIRSTNAME%%}}/i) != -1 ) {
        template = template.replace(/{{%%FIRSTNAME%%}}/i, user.firstname);
      }

      if(template.search(/{{%%LASTNAME%%}}/i) != -1 ) {
        template = template.replace(/{{%%LASTNAME%%}}/i, user.lastname);
      }

      let transporter = nodemailer.createTransport(config.mailConfig);
      let mailOptions = {
        from: '"info@ipic.org.uk" <andy@123789.org>', // sender address
        to: user.email, // list of receivers
        subject: doc.subject, // Subject line
        html: template

      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          return debug(err);
        }
        debug('Message sent: ');
        done(err, 'done');
      });
    })
      .catch(handleError(res));
    }
  ], function(err) {
    if (err) return next(err);

    res.status(200).json({success: true, message:"Email sent successfully for password reset."});

  });
}

export default { create, update, list, remove, listByRole };
