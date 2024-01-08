import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
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
});
