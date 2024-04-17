// demographicReportsService.ts

import {
    getEmployeeDemographics,
    getApplicantDemographics    
    } from '../repositories/demographicReportsRepository';
  
  export async function getEmployeeDemographicsService(): Promise<any> {
    try {
      const employeeDemographics = await getEmployeeDemographics();
      return { success: true, data: employeeDemographics };
    } catch (error) {
      console.error('Error fetching employee demographics:', error);
      return { success: false, error: 'Failed to fetch employee demographics' };
    }
  }
  
  export async function getApplicantDemographicsService(): Promise<any> {
    try {
      const applicantDemographics = await getApplicantDemographics();
      return { success: true, data: applicantDemographics };
    } catch (error) {
      console.error('Error fetching applicant demographics:', error);
      return { success: false, error: 'Failed to fetch applicant demographics' };
    }
  }
