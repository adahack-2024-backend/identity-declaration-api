import { DiversityRepository } from '../repositories/DiversityRepository';
import { SubmissionData } from '../models/SubmissionData'; 

export class DiversityService {
    private responseRepository: DiversityRepository;

    constructor(responseRepository: DiversityRepository) {
        this.responseRepository = responseRepository;
    }

    async getQuestions() {
        return this.responseRepository.getQuestions();
    }

    async submitResponse(data: SubmissionData) {       
        return this.responseRepository.saveResponse(data);
    }
}
