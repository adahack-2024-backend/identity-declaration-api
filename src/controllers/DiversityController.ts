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
            res.status(500).send('Error retrieving questions.');
        }
    }

    public async submitResponse(req: Request, res: Response) {
        try {
            const data: SubmissionData = req.body.responses;
            await diversityService.submitResponse(data);
            res.json({
                status: 'success',
                message: 'Responses submitted successfully.'
            });
        } catch (error) {
            logger.error("Error submitting responses: %s", error);
            res.status(500).send('Internal server error.');
        }
    }
}

const diversityController = new DiversityController();

export { diversityController }
