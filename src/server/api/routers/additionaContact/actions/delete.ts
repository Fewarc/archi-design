import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const deleteAdditionalContactInput = z.object({
  contactId: z.string(),
});

export const deleteAdditionalContact = async (
  input: typeof deleteAdditionalContactInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.additionalContact.delete({ where: { id: input.contactId } });
  } catch (error) {
    console.error(error);
  }
};
