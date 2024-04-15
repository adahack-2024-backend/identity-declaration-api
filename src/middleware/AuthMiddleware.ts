import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user?: any;
}

const secretKey = 'suaChaveSecreta'; // Defina uma chave secreta segura

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        return res.status(401).json({ message: 'Token de autenticação inválido.' });
      }
      (req as CustomRequest).user = decoded;
      next();
  });
}

export function generateToken(data: any) {
  return jwt.sign(data, secretKey, { expiresIn: '1h' }); // Define o tempo de expiração do token
}
