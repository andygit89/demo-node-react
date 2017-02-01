import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import categoryRoutes from './category.route';
import productRoutes from './category.route';

const router = express.Router();



// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

// mount category routes at /category
router.use('/category', categoryRoutes);

// mount category routes at /category
router.use('/product', productRoutes);



export default router;
