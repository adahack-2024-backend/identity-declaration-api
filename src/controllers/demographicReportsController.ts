import { Request, Response } from 'express';
import {
  getEmployeeDemographicsService,
  getApplicantDemographicsService,
  } from '../services/demographicReportsService';

// Controller para dados demográficos dos funcionários
export async function getEmployeeDemographics(req: Request, res: Response): Promise<void> {
  try {
    const result = await getEmployeeDemographicsService();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message:'Internal server error' });
  }
}

// Controller para dados demográficos dos candidatos
export async function getApplicantDemographics(req: Request, res: Response): Promise<void> {
  try {
    const result = await getApplicantDemographicsService();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message:'Internal server error' });
  }
}
