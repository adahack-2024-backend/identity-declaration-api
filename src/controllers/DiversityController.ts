import { Request, Response } from 'express';
import { DiversityRepository } from '../repositories/DiversityRepository';
import { QuestionsResponse } from '../models/QuestionsResponse';

export class DiversityController {
    private repository: DiversityRepository;

    constructor(repository: DiversityRepository) {
        this.repository = repository;
    }

    public async getQuestions(req: Request, res: Response) {
        try {
            const questions = await this.repository.getQuestions();
            const response: QuestionsResponse = { questions };
            res.json(response);
        } catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).send('Erro ao recuperar as perguntas.');
        }
    }

    public async submitResponse(req: Request, res: Response) {
        try {
            const { ageGroup, gender, ethnicity, lgbtqia, parent, disability } = req.body.responses;
            
            if (typeof gender !== 'string' || typeof ethnicity !== 'string' || typeof lgbtqia !== 'boolean' || typeof parent !== 'boolean') {
                return res.status(400).json({
                    status: 'error',
                    message: 'Dados de submissão inválidos.'
                });
            }

            await this.repository.saveResponse({ ageGroup, gender, ethnicity, lgbtqia, parent, disability });
            res.json({
                status: 'success',
                message: 'Respostas submetidas com sucesso.'
            });
        } catch (error) {
            console.error("Error submitting responses:", error);
            res.status(500).send('Erro interno do servidor.');
        }
    }
}
