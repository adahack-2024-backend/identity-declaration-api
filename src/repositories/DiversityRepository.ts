import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { Question } from '../models/Question';
import { SubmissionData } from '../models/SubmissionData';

class DiversityRepository {
    private filePath = path.join(__dirname, '../../resources/questions.json');
    private prisma = new PrismaClient();

    public async getQuestions(): Promise<Question[]> {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const questions: Question[] = JSON.parse(data).questions;
        return questions;
    }

    public async saveResponse(data: SubmissionData) {
        const ageGroup = await this.prisma.ageGroup.findUnique({
            where: { code: data.ageGroupCode }
        });

        const gender = await this.prisma.gender.findUnique({
            where: { code: data.genderCode }
        });

        const ethnicity = await this.prisma.ethnicity.findUnique({
            where: { code: data.ethnicityCode }
        });

        const disability = await this.prisma.disability.findUnique({
            where: { code: data.disabilityCode }
        });

        if (!ageGroup || !gender || !ethnicity || !disability) {
            throw new Error('One of the entities was not found.');
        }

        return this.prisma.diversityResponse.create({
            data: {
                ageGroupId: ageGroup.id,
                genderId: gender.id,
                ethnicityId: ethnicity.id,
                disabilityId: disability.id,
                lgbtqia: data.lgbtqia,
                parent: data.parent,
                isInternalResponse: data.isInternalResponse
            }
        });
    }
}

const diversityRepository = new DiversityRepository();

export { diversityRepository }
