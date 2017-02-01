import express from 'express';
import expressJwt from 'express-jwt';
import authCtrl from '../controllers/auth.controller';
import * as config from '../../config/env';
const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/authenticate')
  .post( authCtrl.login);


export default router;
