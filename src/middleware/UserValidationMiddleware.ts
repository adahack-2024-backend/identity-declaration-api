import { Request, Response, NextFunction } from 'express';

export function validateUserData(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
    }

    next();
}