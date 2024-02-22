import { addAdditionalContactSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

const createAdditionalContactInput = addAdditionalContactSchema; 

export const createAdditionalContact = async (
  input: typeof createAdditionalContactInput._type,
  prisma: PrismaClient
): Promise<void> => {
  try {
    await prisma.additionalContact.create({data: input});
  } catch (error) {
    console.error(error);
  }
}