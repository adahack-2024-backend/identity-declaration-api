import express from 'express';
import { diversityController } from '../controllers/DiversityController';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { validateSubmission } from '../middleware/ValidateSubmissionMiddleware';

const diversityinternalRoutes = express.Router();

//Get
diversityinternalRoutes.get('/diversity/internal/questions', authMiddleware ,diversityController.getQuestions);

//Post
diversityinternalRoutes.post('/diversity/internal/submit', validateSubmission, authMiddleware ,diversityController.submitResponse);

export { diversityinternalRoutes }