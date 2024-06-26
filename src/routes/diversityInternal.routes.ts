import express from 'express';
import { DiversityController } from '../controllers/DiversityController';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { validateSubmission } from '../middleware/ValidateSubmissionMiddleware';
import { internalFlagMiddleware } from '../middleware/InternalFlagMiddleware';
import { validateQueryParamsMiddleware } from '../middleware/ValidateQueryParams';

export function diversityInternalRoutes(diversityController: DiversityController) {
    const router = express.Router();

    router.get('/diversity/internal/questions', authMiddleware, diversityController.getQuestions);
    router.post('/diversity/internal/submit', validateSubmission, authMiddleware, internalFlagMiddleware, diversityController.submitResponse);
    router.get('/diversity/internal/responses', validateQueryParamsMiddleware, authMiddleware, diversityController.getDiversityResponses);
    router.get('/diversity/internal/responses/stats', 
    validateQueryParamsMiddleware, authMiddleware, diversityController.getDiversityStats);

    return router;
}
