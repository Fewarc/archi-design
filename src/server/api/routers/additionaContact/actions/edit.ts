import { addAdditionalContactSchema, additionalContactSchema } from "@/utils/validation";
import { PrismaClient } from "@prisma/client";

export const editAdditionalContactInput = additionalContactSchema;

export const editAdditionalContact = async (
  input: typeof editAdditionalContactInput._type,
  prisma: PrismaClient,
) => {
  try {
    await prisma.additionalContact.update({
      where: { id: input.id },
      data: {
        email: input.email,
        name: input.name,
        note: input.note,
        occupation: input.occupation,
        phoneNumber: input.phoneNumber,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
