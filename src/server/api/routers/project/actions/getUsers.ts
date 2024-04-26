import { PrismaClient } from "@prisma/client";
import { z } from "zod";

export const getProjectUsersInput = z.object({
  projectId: z.string().optional(),
});

export const getProjectUsers = async (
  input: typeof getProjectUsersInput._type,
  prisma: PrismaClient,
) => {
  try {
    if (!!input.projectId) {
      const project = await prisma.project.findFirst({
        where: { id: input.projectId },
      });

      const users = await prisma.user.findMany({
        where: { teamId: project?.teamId },
      });

      return {
        writers: users.map((user) => user.email!),
        readers: project?.email ? [project.email] : [],
      };
    }
  } catch (error) {
    console.error(error);
  }
};
