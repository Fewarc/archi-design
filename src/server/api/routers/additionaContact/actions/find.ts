import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const findAdditionalContactsInput = z.object({
  projectId: z.string(),
});

export const findAdditionalContacts = async (
  input: typeof findAdditionalContactsInput._type,
  prisma: PrismaClient,
) => {
  try {
    return await prisma.additionalContact.findMany({
      where: { projectId: input.projectId },
    });
  } catch (error) {
    console.error(error);
  }
};
