// Import necessary types and utilities
import { Request, Response } from "express";
import { userService } from "../services/UserService";
import { CreateUserRequest } from "../models/CreateUserRequest";
import logger from '../utils/logger';

class UserController {
    async create(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            const userExist = await userService.findUserByEmail(email);
            if (userExist) {
                return res.status(409).json({ message: 'User already exists!' });
            }

            const createUserRequest: CreateUserRequest = { email, password };
            const newUser = await userService.create(createUserRequest);

            res.status(201).json(newUser);
        } catch (error) {
            logger.error('Error creating user: %s', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

const userController = new UserController();

export { userController };
