/**
 * Created by ashish on 12/11/16.
 */

import express from 'express';
import productCtrl from '../controllers/category.controller';
import expressJwt from 'express-jwt';
import * as config from '../../config/env'

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(expressJwt({ secret: config.JWTSECRET }),productCtrl.list)

  .post(expressJwt({ secret: config.JWTSECRET }),productCtrl.createProduct)

  .put(expressJwt({ secret: config.JWTSECRET }),productCtrl.update)

router.route('/:id')

  .delete(expressJwt({ secret: config.JWTSECRET }),productCtrl.remove)

  .post(expressJwt({ secret: config.JWTSECRET }),productCtrl.update)


export default router;
