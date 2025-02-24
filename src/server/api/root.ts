import { createTRPCRouter } from "@/server/api/trpc";
import { projectRouter } from "./routers/project/router";
import { additionalContactRouter } from "./routers/additionaContact/router";
import { noteRouter } from "./routers/note/router";
import { projectStageRouter } from "./routers/projectStage/router";
import { fileRouter } from "./routers/file/router";
import { userRouter } from "./routers/user/router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  project: projectRouter,
  additionalContact: additionalContactRouter,
  note: noteRouter,
  projectStage: projectStageRouter,
  file: fileRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
