import express from 'express';
import { DiversityRepository } from '../repositories/DiversityRepository';
import { DiversityService } from '../services/DiversityService';
import { DiversityController } from '../controllers/DiversityController';
import { prismaClient } from './prismaClient';
import { diversityInternalRoutes } from '../routes/diversityInternal.routes';

const diversityRepository = new DiversityRepository(prismaClient);
const diversityService = new DiversityService(diversityRepository);
const diversityController = new DiversityController(diversityService);

const mainRouter = express.Router();
diversityInternalRoutes(mainRouter, diversityController); 

export {
    diversityRepository,
    diversityService,
    diversityController,
    mainRouter 
};
