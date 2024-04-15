import { SubmissionData } from '../models/SubmissionData';
import { diversityRepository } from '../repositories/DiversityRepository';

class DiversityService {
    async getQuestions() {
        return diversityRepository.getQuestions();
    }

    async submitResponse(data: SubmissionData) {
        return diversityRepository.saveResponse(data);
    }
}

const diversityService = new DiversityService();

export { diversityService }