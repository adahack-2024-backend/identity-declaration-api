// src/repositories/DiversityRepository.ts

import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { Question } from '../models/Question';

export class DiversityRepository {
    private filePath = path.join(__dirname, '../../resources/questions.json');
    private prisma = new PrismaClient();

    public async getQuestions(): Promise<Question[]> {
        const data = fs.readFileSync(this.filePath, 'utf-8');
        const questions: Question[] = JSON.parse(data).questions;
        return questions;
    }

    public async saveResponse(data: {
        ageGroup: string;
        gender: string;
        ethnicity: string;
        lgbtqia: boolean;
        parent: boolean;
        //isInternalResponse: boolean;
        disability: string;
    }) {
        return this.prisma.diversityResponse.create({
            data: data
        });
    }
}
