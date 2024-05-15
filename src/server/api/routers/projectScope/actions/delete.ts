import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const deleteProjectScopeInput = z.object({
  scopeId: z.string(),
});

export const deleteProjectScope = async (
  input: typeof deleteProjectScopeInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.projectScope.delete({ where: { id: input.scopeId } });
  } catch (error) {
    console.error(error);
  }
};
