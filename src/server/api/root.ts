import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { contestRouter } from "./routers/contest";
import { sessionRouter } from "./routers/session";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  session: sessionRouter,
  user: userRouter,
  contest: contestRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
