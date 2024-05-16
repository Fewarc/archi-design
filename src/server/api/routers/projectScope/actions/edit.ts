import { projectScopeSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

export const editProjectScopeInput = projectScopeSchema;

export const editProjectScope = async (
  input: typeof editProjectScopeInput._type,
  prisma: PrismaClient,
) => {
  try {
    const { id: scopeId, ...scopeData } = input;
    await prisma.projectScope.update({
      where: { id: scopeId },
      data: scopeData,
    });
  } catch (error) {
    console.error();
  }
};
