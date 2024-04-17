
import { PrismaClient, DiversityResponse } from '@prisma/client';
import { AgeGroupCode } from '../enums/AgeGroupCode';
import { GenderGroupCode } from '../enums/GenderGroupCode';
import { EthnicityGroupCode } from '../enums/EthnicityGroupCode';
import { LGBTQIAPNGroupCode } from '../enums/Lgbtqiapn+GroupCode';
import { ParentGroupStatus } from '../enums/ParentGroupStatus';
import { DisabilityType } from '../enums/DesabilityType';

const prisma = new PrismaClient();

export async function getEmployeeDemographics(): Promise<DiversityResponse[]> {
  return prisma.diversityResponse.findMany({
    where: { isInternalResponse: true }
  });
}

// Função para buscar dados demográficos com base na faixa etária
export async function getEmployeeReportByAge(age: AgeGroupCode): Promise<number> {
  const count = await prisma.diversityResponse.count({
    where: {
      ageGroup: {
        code: age,
      },
      isInternalResponse: true,
    },
  });

  return count;
}

// Função para buscar dados demográficos com base na identidade de gênero
export async function getEmployeeReportByGender(gender: GenderGroupCode): Promise<number> {
  const count = await prisma.diversityResponse.count({
    where: {
      gender: {
        code: gender,
      },

      isInternalResponse: true, 
    },
  });

  return count;
}

// Função para buscar dados demográficos com base na etnia/racial
export async function getEmployeeReportByEthnicity(ethnicity: EthnicityGroupCode): Promise<number> {
  const count = await prisma.diversityResponse.count({
    where: {
      ethnicity: {
        code: ethnicity,
      },

      isInternalResponse: true, 
    },
  });

  return count;
}

export async function getEmployeeReportByLGBTQIA(status: LGBTQIAPNGroupCode): Promise<number> {
  try {
    let whereClause: any = {
      isInternalResponse: true
    };

        if (status === LGBTQIAPNGroupCode.Yes || status === LGBTQIAPNGroupCode.No) {
      whereClause.lgbtqia = status === LGBTQIAPNGroupCode.Yes;
    } else if (status === LGBTQIAPNGroupCode.PreferNotToSay) {
      whereClause = {
        NOT: {
          OR: [
            { lgbtqia: true },
            { lgbtqia: false }
          ]
        },
        isInternalResponse: true
      };
    }

    const count = await prisma.diversityResponse.count({
      where: whereClause
    });

    return count;
  } catch (error) {
    throw new Error(`Erro ao buscar relatório de LGBTQIA: ${error}`);
  }
}



// Função para buscar a quantidade de candidatos por status de pai/mãe
export async function getEmployeeReportByParentStatus(status: ParentGroupStatus): Promise<number> {
  try {
    let whereClause: any = {
      isInternalResponse: true
    };

    if (status === ParentGroupStatus.Yes || status === ParentGroupStatus.No) {
      whereClause.parent = status === ParentGroupStatus.Yes;
    } else if (status === ParentGroupStatus.PreferNotToSay) {
      whereClause = {
        NOT: {
          OR: [
            { parent: true },
            { parent: false }
          ]
        },
        isInternalResponse: true
      };
    }

    const count = await prisma.diversityResponse.count({
      where: whereClause
    });

    return count;
  } catch (error) {
    throw new Error(`Erro ao buscar relatório de pais/mães: ${error}`);
  }
}

// Função para buscar dados demográficos com base no tipo de deficiência
export async function getEmployeeReportByDisabilityType(disability: DisabilityType): Promise<number> {
  let whereCondition: any = {
    isInternalResponse: true, 
  };

  if (disability !== 'no-disability') {
    whereCondition = {
      ...whereCondition,
      disability: {
        code: disability,
      },
    };
  }

  const count = await prisma.diversityResponse.count({
    where: whereCondition,
  });

  return count;
}

export async function getApplicantDemographics(): Promise<DiversityResponse[]> {
  return prisma.diversityResponse.findMany({
    where: { isInternalResponse: true }
  });
}

// Função para buscar dados demográficos com base na faixa etária
export async function getApplicantReportByAge(age: AgeGroupCode): Promise<number> {
  const count = await prisma.diversityResponse.count({
    where: {
      ageGroup: {
        code: age,
      },
      isInternalResponse: false,
    },
  });

  return count;
}

// Função para buscar dados demográficos com base na identidade de gênero
export async function getApplicantReportByGender(gender: GenderGroupCode): Promise<number> {
  const count = await prisma.diversityResponse.count({
    where: {
      gender: {
        code: gender,
      },

      isInternalResponse: false, 
    },
  });

  return count;
}

// Função para buscar dados demográficos com base na etnia/racial
export async function getApplicantReportByEthnicity(ethnicity: EthnicityGroupCode): Promise<number> {
  const count = await prisma.diversityResponse.count({
    where: {
      ethnicity: {
        code: ethnicity,
      },

      isInternalResponse: false, 
    },
  });

  return count;
}

export async function getApplicantReportByLGBTQIA(status: LGBTQIAPNGroupCode): Promise<number> {
  try {
    let whereClause: any = {
      isInternalResponse: false
    };

    
    if (status === LGBTQIAPNGroupCode.Yes || status === LGBTQIAPNGroupCode.No) {
      whereClause.lgbtqia = status === LGBTQIAPNGroupCode.Yes;
    } else if (status === LGBTQIAPNGroupCode.PreferNotToSay) {
      whereClause = {
        NOT: {
          OR: [
            { lgbtqia: true },
            { lgbtqia: false }
          ]
        },
        isInternalResponse: false
      };
    }

    const count = await prisma.diversityResponse.count({
      where: whereClause
    });

    return count;
  } catch (error) {
    throw new Error(`Erro ao buscar relatório de LGBTQIA: ${error}`);
  }
}



// Função para buscar a quantidade de candidatos por status de pai/mãe com isInternalResponse false
export async function getApplicantReportByParentStatus(status: ParentGroupStatus): Promise<number> {
  try {
    let whereClause: any = {
      isInternalResponse: false
    };

    
    if (status === ParentGroupStatus.Yes || status === ParentGroupStatus.No) {
      whereClause.parent = status === ParentGroupStatus.Yes;
    } else if (status === ParentGroupStatus.PreferNotToSay) {
      whereClause = {
        NOT: {
          OR: [
            { parent: true },
            { parent: false }
          ]
        },
        isInternalResponse: false
      };
    }

    const count = await prisma.diversityResponse.count({
      where: whereClause
    });

    return count;
  } catch (error) {
    throw new Error(`Erro ao buscar relatório de pais/mães: ${error}`);
  }
}

// Função para buscar dados demográficos com base no tipo de deficiência
export async function getApplicantReportByDisabilityType(disability: DisabilityType): Promise<number> {
  let whereCondition: any = {
    isInternalResponse: false, 
  };

  
  if (disability !== 'no-disability') {
    whereCondition = {
      ...whereCondition,
      disability: {
        code: disability,
      },
    };
  }

  const count = await prisma.diversityResponse.count({
    where: whereCondition,
  });

  return count;
}