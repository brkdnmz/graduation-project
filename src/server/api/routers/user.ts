import { faker } from "@faker-js/faker";
import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { z } from "zod";
import {
  authenticatedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "../trpc";

const publicUserFields = {
  id: true,
  username: true,
  createdAt: true,
  updatedAt: true,
} satisfies Prisma.UserSelect;

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(
      z.object({ id: z.number().optional(), username: z.string().optional() }),
    )
    .query(async ({ ctx, input }) => {
      if (input.username === undefined && input.id === undefined) return null;

      const user = await ctx.db.user.findFirst({
        where: { OR: [{ id: input.id }, { username: input.username }] },
        select: publicUserFields,
      });

      return user;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findMany({ select: publicUserFields });
  }),
  updateProfilePicture: authenticatedProcedure
    .input(
      z.object({
        userId: z.number(),
        newProfilePicture: z.instanceof(Uint8Array),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.session.userId !== input.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Unallowed to update another user's profile picture",
        });
      }

      const userDataDir = path.join(
        process.cwd(),
        "data",
        "user",
        input.userId.toString(),
      );

      fs.mkdirSync(userDataDir, {
        recursive: true,
      });

      const profilePicturePath = path.join(userDataDir, "profile-picture.png");

      fs.writeFileSync(profilePicturePath, input.newProfilePicture);

      return await ctx.db.user.update({
        where: { id: input.userId },
        data: { profilePicture: profilePicturePath },
        select: publicUserFields,
      });
    }),
  getProfilePicture: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
        select: { profilePicture: true },
      });

      const profilePicturePath =
        user?.profilePicture ??
        path.join(process.cwd(), "public", "profile-placeholder.png");

      return fs.readFileSync(profilePicturePath);
    }),
  createRandomUser: publicProcedure.mutation(async ({ ctx }) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const username = faker.internet.userName({ firstName, lastName });
    const email = faker.internet.email({
      firstName,
      lastName,
      allowSpecialCharacters: true,
    });

    return ctx.db.user.create({
      data: {
        email,
        username,
        password: bcrypt.hashSync(faker.internet.password(), 10),
      },
    });
  }),
  deleteUser: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.user.delete({ where: { id: input.id } });
    }),
});
