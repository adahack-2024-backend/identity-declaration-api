import { Request, Response } from 'express';
import { DiversityService } from '../services/DiversityService'; 
import { SubmissionData } from '../models/SubmissionData';

export class DiversityController {
    private diversityService: DiversityService;

    constructor(diversityService: DiversityService) {
        this.diversityService = diversityService;
    }

    public async getQuestions(req: Request, res: Response) {
        try {
            const questions = await this.diversityService.getQuestions();
            res.json({ questions });
        } catch (error) {
            console.error("Error fetching questions:", error);
            res.status(500).send('Erro ao recuperar as perguntas.');
        }
    }

    public async submitResponse(req: Request, res: Response) {
        try {
            const data: SubmissionData = req.body.responses;

            if (!this.validateSubmissionData(data)) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Dados de submissão inválidos.'
                });
            }

            const isInternal = req.url.split("/").includes('internal');
            if(isInternal) data.isInternalResponse = true;

            await this.diversityService.submitResponse(data);
            res.json({
                status: 'success',
                message: 'Respostas submetidas com sucesso.'
            });
        } catch (error) {
            console.error("Error submitting responses:", error);
            res.status(500).send('Erro interno do servidor.');
        }
    }

    private validateSubmissionData(data: SubmissionData): boolean {
        return typeof data.genderCode === 'string' &&
               typeof data.ethnicityCode === 'string' &&
               typeof data.lgbtqia === 'boolean' &&
               typeof data.parent === 'boolean';
    }
}
