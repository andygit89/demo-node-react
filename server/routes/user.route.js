import express from 'express';
import userCtrl from '../controllers/user.controller';

const router = express.Router();

router.route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list)

  /** POST /api/users - Create new user */
  .post(userCtrl.create);

router.route('/:userId')


  /** PUT /api/users/:userId - Update user */
  .put(userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);



export default router;
