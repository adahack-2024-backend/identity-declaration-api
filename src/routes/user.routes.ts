import express from 'express';
import { userController } from '../controllers/UserController';
import { validateUserData } from '../middleware/UserValidationMiddleware';

const userRoutes = express.Router();

userRoutes.post('/user', validateUserData, userController.create);

export { userRoutes }