import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';

export async function validateUserData(req: Request, res: Response, next: NextFunction) {
    try {
        const emailInvalid = await body('email').notEmpty().isEmail().withMessage('email not valid').run(req);
        const passwordInvalid = await body('password').isStrongPassword({
            minLength: 6, 
            minLowercase: 1, 
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).run(req);

        if (!emailInvalid.isEmpty()) return res.status(400).send({ error: 'email not valid' });
        if (!passwordInvalid.isEmpty()) return res.status(400).send({ error: 'password not valid' });

        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
        next(error);
    }
}




