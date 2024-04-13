import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { Question } from '../models/Question';
import { SubmissionData } from '../models/SubmissionData'; 

export class DiversityRepository {
    private filePath = path.join(__dirname, '../../resources/questions.json');
    private prisma = new PrismaClient();

    public async getQuestions(): Promise<Question[]> {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const questions: Question[] = JSON.parse(data).questions;
        return questions;
    }

    public async saveResponse(data: SubmissionData) {     
        console.log("Buscando AgeGroup com código:", data.ageGroupCode);   
        const ageGroup = await this.prisma.ageGroup.findUnique({
            where: { code: data.ageGroupCode }
        });
        console.log("AgeGroup encontrado:", ageGroup);

        console.log("Buscando Gender com código:", data.genderCode);
        const gender = await this.prisma.gender.findUnique({
            where: { code: data.genderCode }
        });
        console.log("Gender encontrado:", gender);

        console.log("Buscando Ethnicity com código:", data.ethnicityCode);
        const ethnicity = await this.prisma.ethnicity.findUnique({
            where: { code: data.ethnicityCode }
        });
        console.log("Ethnicity encontrado:", ethnicity);

        console.log("Buscando Disability com código:", data.disabilityCode);
        const disability = await this.prisma.disability.findUnique({
            where: { code: data.disabilityCode }
        });
        console.log("Disability encontrado:", disability);

        

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
                // isInternalResponse: data.isInternalResponse
            }
        });
    }
}
