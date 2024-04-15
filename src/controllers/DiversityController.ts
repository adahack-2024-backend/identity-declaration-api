import { Request, Response } from 'express';
import { SubmissionData } from '../models/SubmissionData';
import { diversityService } from '../services/DiversityService';
import logger from '../utils/logger';

class DiversityController {
    public async getQuestions(req: Request, res: Response) {
        try {
            const questions = await diversityService.getQuestions();
            res.json({ questions });
        } catch (error) {
            logger.error("Error fetching questions: %s", error);
            res.status(500).send('Erro ao recuperar as perguntas.');
        }
    }

    public async submitResponse(req: Request, res: Response) {
        try {
            const data: SubmissionData = req.body.responses;
            await diversityService.submitResponse(data);
            res.json({
                status: 'success',
                message: 'Respostas submetidas com sucesso.'
            });
        } catch (error) {
            logger.error("Error submitting responses: %s", error);
            res.status(500).send('Erro interno do servidor.');
        }
    }
}

const diversityController = new DiversityController();

export { diversityController }
