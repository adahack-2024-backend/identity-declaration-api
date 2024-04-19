import { DiversityQueryParams } from '../models/DiversityQueryParams';
import { SubmissionData } from '../models/SubmissionData';

export interface IDiversityService {
    getQuestions(): Promise<any>;
    submitResponse(data: SubmissionData): Promise<any>;
    getDiversityResponses(queryParams: DiversityQueryParams): Promise<any>;
    getDiversityStats(queryParams: DiversityQueryParams): Promise<any>;
}
