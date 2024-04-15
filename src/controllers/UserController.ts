import { Request, Response, NextFunction } from "express";
import { userService } from "../services/UserService";

class UserController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const userExist = await userService.findByEmail(email);

            if (userExist) {
                res.status(400).send({ message: 'user already exists!' });
            }

            const newUser = await userService.create(email, password);

            res.status(201).send(newUser)
        } catch (error) {
            res.status(500).send({ error: 'Internal server error' });
            next(error);
        }
    }
}

const userController = new UserController();

export { userController }