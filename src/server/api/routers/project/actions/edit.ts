import { editProjectSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

export const editProjectInput = editProjectSchema;

export const editProject = async (
  input: typeof editProjectInput._type,
  prisma: PrismaClient,
) => {
  try {
    const { id: projectId, ...projectData } = input;
    await prisma.project.update({
      where: { id: projectId },
      data: projectData,
    });
  } catch (error) {
    console.error(error);
  }
};
