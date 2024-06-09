import { authenticatedProcedure, createTRPCRouter } from "../trpc";

export const sessionRouter = createTRPCRouter({
  getSession: authenticatedProcedure.query(({ ctx }) => {
    const { createdAt, updatedAt, email, id, username } = ctx.session.user;
    return { createdAt, updatedAt, email, id, username };
  }),
});
