import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const authRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email("Must be a valid email").trim(),
        username: z.string().min(1, "Must not be empty").trim(),
        password: z.string().min(1, "Must not be empty"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findFirst({
        where: { OR: [{ email: input.email }, { username: input.username }] },
      });

      if (user)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "User with the same email/username exists",
        });

      const passwordEncrypted = bcrypt.hashSync(input.password, 10);

      const createdUser = await ctx.db.user.create({
        data: {
          email: input.email,
          username: input.username,
          password: passwordEncrypted,
        },
      });

      return createdUser;
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

      return { accessToken: newAccessToken, expiresAt: yearLater, user };
    }),

  // deleteSession
  logout: publicProcedure.mutation(({ ctx }) => {
    const accessToken = cookies().get("access_token")?.value;
    if (accessToken) return ctx.db.session.delete({ where: { accessToken } });
  }),
});
