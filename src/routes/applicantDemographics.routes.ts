import express, { Request, Response } from 'express';
import { getApplicantDemographicsService } from '../services/demographicReportsService';
import { authMiddleware } from '../middleware/AuthMiddleware';
import { getApplicantReportByAge } from '../repositories/demographicReportsRepository';
import { getApplicantReportByGender } from '../repositories/demographicReportsRepository';
import { getApplicantReportByEthnicity } from '../repositories/demographicReportsRepository';
import { getApplicantReportByLGBTQIA } from '../repositories/demographicReportsRepository';
import { getApplicantReportByParentStatus } from '../repositories/demographicReportsRepository';
import { getApplicantReportByDisabilityType } from '../repositories/demographicReportsRepository';
import { AgeGroupCode } from '../enums/AgeGroupCode';
import { GenderGroupCode } from '../enums/GenderGroupCode';
import { EthnicityGroupCode } from '../enums/EthnicityGroupCode';
import { LGBTQIAPNGroupCode } from '../enums/Lgbtqiapn+GroupCode';
import { ParentGroupStatus } from '../enums/ParentGroupStatus';
import { DisabilityType } from '../enums/DesabilityType';

const applicantDemographicsroutes = express.Router();

// Get para obter dados demográficos dos candidatos
applicantDemographicsroutes.get('/applicantreport', authMiddleware, async (req: Request, res: Response) => {
  const result = await getApplicantDemographicsService();
  if (result.success) {
    res.json(result.data);
  } else {
    res.status(500).json({ error: result.error });
  }
});

applicantDemographicsroutes.get('/applicantreport/age/:age', async (req: Request, res: Response) => {
  const age = req.params.age as AgeGroupCode; // Convertendo para o tipo AgeGroupCode
  const count = await getApplicantReportByAge(age);
  res.json({ count });
});

applicantDemographicsroutes.get('/applicantreport/gender/:gender', async (req: Request, res: Response) => {
  const gender = req.params.gender as GenderGroupCode; // Convertendo para o tipo GenderCode
  const count = await getApplicantReportByGender(gender);
  res.json({ count });
});

applicantDemographicsroutes.get('/applicantreport/ethnicity/:ethnicity', async (req: Request, res: Response) => {
  const ethnicity = req.params.ethnicity as EthnicityGroupCode;
  const count = await getApplicantReportByEthnicity(ethnicity);
  res.json({ count });
});

applicantDemographicsroutes.get('/applicantreport/lgbtqia/:status', async (req: Request, res: Response) => {
  const status = req.params.status as LGBTQIAPNGroupCode;
  const count = await getApplicantReportByLGBTQIA(status);
  res.json({ count });
});

applicantDemographicsroutes.get('/applicantreport/parent/:status', async (req: Request, res: Response) => {
  const status = req.params.status as ParentGroupStatus;
  const count = await getApplicantReportByParentStatus(status);
  res.json({ count });
});

applicantDemographicsroutes.get('/applicantreport/disability/:type', async (req: Request, res: Response) => {
  const disability = req.params.type as DisabilityType;
  const count = await getApplicantReportByDisabilityType(disability);
  res.json({ count });
});

export {applicantDemographicsroutes};
