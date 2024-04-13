import express from 'express';
import { DiversityController } from '../controllers/DiversityController'; 
import { DiversityRepository } from '../repositories/DiversityRepository';

const router = express.Router();
const diversityRepository = new DiversityRepository(); 
const diversityController = new DiversityController(diversityRepository);

router.get('/diversity/external/questions', (req, res) => diversityController.getQuestions(req, res));
router.post('/diversity/external/submit', (req, res) => diversityController.submitResponse(req, res));

export default router;
