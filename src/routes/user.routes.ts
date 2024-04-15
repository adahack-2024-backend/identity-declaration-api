import express from 'express';
import { userController } from '../controllers/UserController';

const userRoutes = express.Router();

userRoutes.post('/user', userController.create);

export { userRoutes }