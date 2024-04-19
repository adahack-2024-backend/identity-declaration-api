import { DiversityQueryParams } from '../models/DiversityQueryParams';
import { SubmissionData } from '../models/SubmissionData';

export interface IDiversityRepository {
    getQuestions(): Promise<any>;
    saveResponse(data: SubmissionData): Promise<any>;
    getDiversityResponses(queryParams: DiversityQueryParams): Promise<any>;
    getDiversityStats(queryParams: DiversityQueryParams): Promise<any>;
}
