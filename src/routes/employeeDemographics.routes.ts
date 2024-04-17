import express, { Request, Response } from 'express';
import { getEmployeeDemographicsService } from '../services/demographicReportsService';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { getEmployeeReportByAge } from '../repositories/demographicReportsRepository';
import { getEmployeeReportByGender } from '../repositories/demographicReportsRepository';
import { getEmployeeReportByEthnicity } from '../repositories/demographicReportsRepository';
import { getEmployeeReportByLGBTQIA } from '../repositories/demographicReportsRepository';
import { getEmployeeReportByParentStatus } from '../repositories/demographicReportsRepository';
import { getEmployeeReportByDisabilityType } from '../repositories/demographicReportsRepository';
import { AgeGroupCode } from '../enums/AgeGroupCode';
import { GenderGroupCode } from '../enums/GenderGroupCode';
import { EthnicityGroupCode } from '../enums/EthnicityGroupCode';
import { LGBTQIAPNGroupCode } from '../enums/Lgbtqiapn+GroupCode';
import { ParentGroupStatus } from '../enums/ParentGroupStatus';
import { DisabilityType } from '../enums/DesabilityType';

const employeeDemographicsroutes = express.Router();

// Get para obter dados demográficos dos funcionários
employeeDemographicsroutes.get('/employeeDemographics', authMiddleware, async (req: Request, res: Response) => {
  const result = await getEmployeeDemographicsService();
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(500).json({ error: result.error });
  }
});

employeeDemographicsroutes.get('/applicantreport/age/:age', async (req: Request, res: Response) => {
  const age = req.params.age as AgeGroupCode; // Convertendo para o tipo AgeGroupCode
  const count = await getEmployeeReportByAge(age);
  res.json({ count });
});

employeeDemographicsroutes.get('/applicantreport/gender/:gender', async (req: Request, res: Response) => {
  const gender = req.params.gender as GenderGroupCode; // Convertendo para o tipo GenderCode
  const count = await getEmployeeReportByGender(gender);
  res.json({ count });
});

employeeDemographicsroutes.get('/applicantreport/ethnicity/:ethnicity', async (req: Request, res: Response) => {
  const ethnicity = req.params.ethnicity as EthnicityGroupCode;
  const count = await getEmployeeReportByEthnicity(ethnicity);
  res.json({ count });
});

employeeDemographicsroutes.get('/applicantreport/lgbtqia/:status', async (req: Request, res: Response) => {
  const status = req.params.status as LGBTQIAPNGroupCode;
  const count = await getEmployeeReportByLGBTQIA(status);
  res.json({ count });
});

employeeDemographicsroutes.get('/applicantreport/parent/:status', async (req: Request, res: Response) => {
  const status = req.params.status as ParentGroupStatus;
  const count = await getEmployeeReportByParentStatus(status);
  res.json({ count });
});

employeeDemographicsroutes.get('/applicantreport/disability/:type', async (req: Request, res: Response) => {
  const disability = req.params.type as DisabilityType;
  const count = await getEmployeeReportByDisabilityType(disability);
  res.json({ count });
});



export  {employeeDemographicsroutes};