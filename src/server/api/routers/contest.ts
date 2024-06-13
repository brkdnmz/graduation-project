import type { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { contestCategories } from "~/types/contest";
import {
  authenticatedProcedure,
  createTRPCRouter,
  publicProcedure,
} from "../trpc";

export const contestRouter = createTRPCRouter({
  create: authenticatedProcedure
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
          creatorId: ctx.session.userId,
        },
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.contest.findMany({
      include: {
        creator: {
          select: {
            username: true,
          },
        },
      },
    });
  }),
  get: publicProcedure
    .input(
      z.object({
        type: z.enum(contestCategories),
      }),
    )
    .query(async ({ ctx, input }) => {
      const dateNow = new Date();

      let queryWhere: Prisma.ContestFindManyArgs["where"];

      switch (input.type) {
        case "ongoing":
          queryWhere = { startsAt: { lte: dateNow }, endsAt: { gt: dateNow } };
          break;
        case "upcoming":
          queryWhere = { startsAt: { gt: dateNow }, endsAt: { gt: dateNow } };
          break;
        case "ended":
          queryWhere = { startsAt: { lt: dateNow }, endsAt: { lte: dateNow } };
          break;
        default:
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Invalid contest type",
          });
      }

      return ctx.db.contest.findMany({
        where: queryWhere,
        include: {
          creator: {
            select: {
              username: true,
            },
          },
        },
      });
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.contest.findUnique({ where: { id: input.id } });
    }),
  registerCurrentUser: authenticatedProcedure
    .input(z.object({ contestId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const contest = await ctx.db.contest.findUnique({
        where: { id: input.contestId },
        include: { registeredUsers: true },
      });

      if (!contest)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Contest not found",
        });

      if (
        contest.registeredUsers.map(({ id }) => id).includes(ctx.session.userId)
      )
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Already registered",
        });

      const dateNow = new Date();

      if (dateNow >= contest.endsAt)
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Contest ended",
        });

      return ctx.db.contest.update({
        where: { id: input.contestId },
        data: { registeredUsers: { connect: { id: ctx.session.userId } } },
      });
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.contest.delete({ where: { id: input.id } });
    }),
});
