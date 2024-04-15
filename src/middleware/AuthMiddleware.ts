import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

// interface CustomRequest extends Request {
//   user?: any;
// }

// const secretKey = 'suaChaveSecreta'; // Defina uma chave secreta segura

// export function verifyToken(req: Request, res: Response, next: NextFunction) {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(401).json({ message: 'Token de autenticação não fornecido.' });
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//         return res.status(401).json({ message: 'Token de autenticação inválido.' });
//       }
//       (req as CustomRequest).user = decoded;
//       next();
//   });
// }

// export function generateToken(data: any) {
//   return jwt.sign(data, secretKey, { expiresIn: '1h' }); // Define o tempo de expiração do token
// }

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.header('Authorization');

    if (!authorizationHeader) {
      return res.status(400).send({ error: 'No token provided' });
    }

    if (!authorizationHeader.toLocaleLowerCase().startsWith('bearer ')) {
      return res.status(400).send({ error: 'No token provided' });
    }

    const accessToken = authorizationHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET!;

    try {
      jwt.verify(accessToken, secret);
    } catch (error) {
      return res.status(400).send({ error: 'No token provided' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    next(error);
  }
}

export { authMiddleware }

// export function authMiddleware(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).send({ error: 'No token provided' });
//   }

//   const parts = authHeader.split(' ');

//   if (parts.length !== 2) {
//     return res.status(401).send({ error: 'Token error' });
//   }

//   const [scheme, token] = parts;

//   if (!/^Bearer$/i.test(scheme)) {
//     return res.status(401).send({ error: 'Token malformatted' });
//   }

//   try {
//     const decoded = verify(token, process.env.JWT_SECRET!);
//     req.user = { id: decoded.id };

//   } catch (err) {
//     return res.status(401).send({ error: 'Token invalid' });
//   }
// }