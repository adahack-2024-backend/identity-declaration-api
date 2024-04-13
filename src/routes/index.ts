import express from 'express';
import { DiversityController } from '../controllers/DiversityController';
import { DiversityService } from '../services/DiversityService';
import { DiversityRepository } from '../repositories/DiversityRepository';

const router = express.Router();
const diversityRepository = new DiversityRepository();
const diversityService = new DiversityService(diversityRepository);
const diversityController = new DiversityController(diversityService);
router.get('/diversity/questions', (req, res) => diversityController.getQuestions(req, res));
router.post('/diversity/external/submit', (req, res) => diversityController.submitResponse(req, res));
router.post('/diversity/internal/submit', (req, res) => diversityController.submitResponse(req, res));

export default router;
