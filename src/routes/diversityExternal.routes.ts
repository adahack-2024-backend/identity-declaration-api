import express from 'express';
import { diversityController } from '../controllers/DiversityController';

const diversityExternalRoutes = express.Router();

//Get
diversityExternalRoutes.get('/diversity/external/questions', diversityController.getQuestions);

//Post
diversityExternalRoutes.post('/diversity/external/submit', diversityController.submitResponse);

export { diversityExternalRoutes }