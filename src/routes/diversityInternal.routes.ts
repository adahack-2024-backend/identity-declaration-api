import express from 'express';
import { diversityController } from '../controllers/DiversityController';
import { authMiddleware } from '../middleware/AuthMiddleware';

const diversityinternalRoutes = express.Router();

//Get
diversityinternalRoutes.get('/diversity/internal/questions', authMiddleware ,diversityController.getQuestions);

//Post
diversityinternalRoutes.post('/diversity/internal/submit', authMiddleware ,diversityController.submitResponse);

export { diversityinternalRoutes }