import express from 'express';
import { diversityController } from '../controllers/DiversityController';
import { validateSubmission } from '../middleware/ValidateSubmissionMiddleware';

const diversityExternalRoutes = express.Router();

//Get
diversityExternalRoutes.get('/diversity/external/questions', diversityController.getQuestions);

//Post
diversityExternalRoutes.post('/diversity/external/submit', validateSubmission, diversityController.submitResponse);

export { diversityExternalRoutes }