import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { z } from "zod";
import {
  authenticatedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "../trpc";

export const sessionRouter = createTRPCRouter({
  getSession: authenticatedProcedure.query(({ ctx }) => {
    const { createdAt, email, id, username } = ctx.session.user;
    return { createdAt, email, id, username };
  }),

  // createSession
  login: publicProcedure
    .input(
      z.object({
        emailOrUsername: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: {
          OR: [
            { email: input.emailOrUsername },
            { username: input.emailOrUsername },
          ],
        },
      });

      const invalidError = new TRPCError({
        code: "FORBIDDEN",
        message: "Invalid email/username or password",
      });

      if (!user) throw invalidError;

      const isValidPassword = bcrypt.compareSync(input.password, user.password);

      if (!isValidPassword) throw invalidError;

      let newAccessToken = randomUUID();
      while (
        await ctx.db.session.count({ where: { accessToken: newAccessToken } })
      ) {
        newAccessToken = randomUUID();
      }

      const yearLater = new Date();
      yearLater.setFullYear(yearLater.getFullYear() + 1); // 1 year duration
      await ctx.db.session.create({
        data: {
          accessToken: newAccessToken,
          expiresAt: yearLater,
          userId: user.id,
        },
      });

      return { accessToken: newAccessToken, user };
    }),

  // deleteSession
  logout: publicProcedure.mutation(({ ctx }) => {
    const accessToken = cookies().get("access_token")?.value;
    if (accessToken) return ctx.db.session.delete({ where: { accessToken } });
  }),
});
