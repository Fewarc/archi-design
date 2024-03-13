import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const addFileInput = z.object({
  lastModified: z.number(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  webkitRelativePath: z.string(),
  statusIndex: z.number(),
  base64: z.string(),
});

export const addFile = async (
  input: typeof addFileInput._type,
  prisma: PrismaClient,
) => {
  const fs = require('fs');
  try {
    // console.log(input)
    // const base64String = input.base64;
    // // Decode the base64 string back to the file
    // const buffer = Buffer.from(base64String, "base64");
    // const filePath = "saved.pdf";

    // // Write the buffer to the file system
    // fs.writeFileSync(filePath, buffer);
    // upload files to google
    return input.statusIndex;
  } catch (error) {
    console.error(error);
  }
};
