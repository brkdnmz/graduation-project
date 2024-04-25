import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const contestRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z
        .object({
          contestName: z.string().min(1, "Must not be empty"),
          contestType: z.union([
            z.literal("Image Segmentation"),
            z.literal("Object Detection"),
          ]),
          startsAt: z.coerce.date().min(new Date(), "Must start in the future"),
          endsAt: z.coerce.date().min(new Date()),
        })
        .refine((fields) => fields.startsAt <= fields.endsAt, {
          message: "Must not end before the start date",
          path: ["endsAt"],
        }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.contest.create({
        data: {
          name: input.contestName,
          type: input.contestType,
          startsAt: input.startsAt,
          endsAt: input.endsAt,
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.contest.findMany();
  }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.contest.findUnique({ where: { id: input.id } });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.contest.delete({ where: { id: input.id } });
    }),
});
