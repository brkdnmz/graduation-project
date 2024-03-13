import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import _ from "lodash-es";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ id: z.number().nullish() }))
    .query(async ({ ctx, input }) => {
      // null or undefined
      if (input.id == undefined) return null;
      const user = await ctx.db.user.findFirst({ where: { id: input.id } });
      if (!user) return null;
      return _.omit(user, ["password"]);
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return (await ctx.db.user.findMany()).map((user) =>
      _.omit(user, ["password"]),
    );
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
