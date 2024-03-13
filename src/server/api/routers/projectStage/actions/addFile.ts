import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const addFileInput = z.object({
  file: z.string(),
});

export const addFile = async (
  input: typeof addFileInput._type,
  prisma: PrismaClient,
) => {
  const fs = require('fs');
  try {
    const base64String = input.file;
    // Decode the base64 string back to the file
    const buffer = Buffer.from(base64String, "base64");
    const filePath = "saved.pdf";

    // Write the buffer to the file system
    fs.writeFileSync(filePath, buffer);
    console.log(buffer);
    // upload files to google
  } catch (error) {
    console.error(error);
  }
};
