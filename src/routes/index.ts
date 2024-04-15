import express from 'express';
import { DiversityController } from '../controllers/DiversityController';
import { DiversityService } from '../services/DiversityService';
import { DiversityRepository } from '../repositories/DiversityRepository';
import { verifyToken } from '../middleware/AuthMiddleware'
//import {AuthController} from '../controllers/AuthController'

const router = express.Router();
const diversityRepository = new DiversityRepository();
const diversityService = new DiversityService(diversityRepository);
const diversityController = new DiversityController(diversityService);
router.get('/diversity/external/questions', (req, res) => diversityController.getQuestions(req, res));
router.post('/diversity/external/submit', (req, res) => diversityController.submitResponse(req, res));

export default router;
