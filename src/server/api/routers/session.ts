import { authenticatedProcedure, createTRPCRouter } from "../trpc";

export const sessionRouter = createTRPCRouter({
  getSession: authenticatedProcedure.query(({ ctx }) => {
    const { createdAt, email, id, username } = ctx.session.user;
    return { createdAt, email, id, username };
  }),
});
