require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const ageGroups = [
    { code: "under-18", description: "Menos de 18 anos" },
    { code: "18-24", description: "18-24 anos" },
    { code: "25-34", description: "25-34 anos" },
    { code: "35-44", description: "35-44 anos" },
    { code: "45-54", description: "45-54 anos" },
    { code: "55-64", description: "55-64 anos" },
    { code: "65-plus", description: "65 anos ou mais" },
  ];
  for (const group of ageGroups) {
    await prisma.ageGroup.create({ data: group });
  }

  const genders = [
    { code: "cis-male", value: "Homem cisgênero" },
    { code: "cis-female", value: "Mulher cisgênero" },
    { code: "trans-male", value: "Homem transgênero" },
    { code: "trans-female", value: "Mulher transgênero" },
    { code: "non-binary", value: "Não-binário" },
    { code: "prefer-not-to-say", value: "Prefiro não dizer" },
    { code: "other", value: "Outro" },
  ];
  for (const gender of genders) {
    await prisma.gender.create({ data: gender });
  }

  const ethnicities = [
    { code: "white", value: "Branco - Caucasiano" },
    { code: "black", value: "Negro - Africano/Afro-americano" },
    { code: "hispanic-latino", value: "Hispânico ou Latino" },
    { code: "asian", value: "Asiático" },
    { code: "indigenous", value: "Indígena" },
    { code: "prefer-not-to-say", value: "Prefiro não dizer" },
    { code: "other", value: "Outro" },
  ];
  for (const ethnicity of ethnicities) {
    await prisma.ethnicity.create({ data: ethnicity });
  }

  const disabilities = [
    { code: "visual-impairment", value: "Deficiência visual" },
    { code: "hearing-impairment", value: "Deficiência auditiva" },
    { code: "motor-disability", value: "Deficiência motora" },
    { code: "intellectual-disability", value: "Deficiência intelectual" },
    { code: "psychosocial-disability", value: "Deficiência psicossocial" },
    { code: "no-disability", value: "Não possuo deficiência" },
    { code: "prefer-not-to-say", value: "Prefiro não dizer" },
    { code: "other", value: "Outra" },
  ];
  for (const disability of disabilities) {
    await prisma.disability.create({ data: disability });
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
