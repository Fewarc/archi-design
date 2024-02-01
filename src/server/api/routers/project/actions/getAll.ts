import { PrismaClient } from "@prisma/client";

export const getAllProjects = async (prisma: PrismaClient) => {
  try {
    return await prisma.project.findMany();
  } catch (error) {
    console.error(error);
  }
}