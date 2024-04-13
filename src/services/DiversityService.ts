import { DiversityRepository } from '../repositories/DiversityRepository';

export class DiversityService {
    private responseRepository: DiversityRepository;

    constructor(responseRepository: DiversityRepository) {
        this.responseRepository = responseRepository;
    }

    async submitResponse(data: { ageGroup: string, gender: string; ethnicity: string; lgbtqia: boolean; parent: boolean, disability: string }) {
        return this.responseRepository.saveResponse(data);
    }
}
