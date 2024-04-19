import { IDiversityService } from '../services/IDiversityService';
import { DiversityQueryParams } from '../models/DiversityQueryParams';
import { SubmissionData } from '../models/SubmissionData';
import { diversityRepository } from '../repositories/DiversityRepository';

class DiversityService implements IDiversityService {
    async getQuestions() {
        return diversityRepository.getQuestions();
    }

    async submitResponse(data: SubmissionData) {
        return diversityRepository.saveResponse(data);
    }

    async getDiversityResponses(queryParams: DiversityQueryParams) {
        return diversityRepository.getDiversityResponses(queryParams);
    }

    async getDiversityStats(queryParams: DiversityQueryParams) {
        return diversityRepository.getDiversityStats(queryParams);
    }
}

export { DiversityService };