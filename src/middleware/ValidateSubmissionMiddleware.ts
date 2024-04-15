import { Request, Response, NextFunction } from 'express';
import { SubmissionData } from '../models/SubmissionData';

export function validateSubmission(req: Request, res: Response, next: NextFunction) {
    const data: SubmissionData = req.body.responses;

    if (!data || typeof data.genderCode !== 'string' ||
        typeof data.ethnicityCode !== 'string' ||
        typeof data.lgbtqia !== 'boolean' ||
        typeof data.parent !== 'boolean') {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid submission data.'
        });
    }

    next();
}
