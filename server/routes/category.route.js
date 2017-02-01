/**
 * Created by admin1 on 2/11/16.
 */
import express from 'express';
import categoryCtrl from '../controllers/category.controller';
import expressJwt from 'express-jwt';
import * as config from '../../config/env'

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(expressJwt({ secret: config.JWTSECRET }),categoryCtrl.list)

  .post(expressJwt({ secret: config.JWTSECRET }),categoryCtrl.createCategory)

  .put(expressJwt({ secret: config.JWTSECRET }),categoryCtrl.update)

router.route('/:id')

  .delete(expressJwt({ secret: config.JWTSECRET }),categoryCtrl.remove)

  .post(expressJwt({ secret: config.JWTSECRET }),categoryCtrl.update)


export default router;
