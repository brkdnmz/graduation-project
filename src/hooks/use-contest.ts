"use client";

import type { Contest } from "@prisma/client";
import { api } from "~/trpc/react";

export function useContest(contestId: Contest["id"]) {
  return api.contest.getById.useQuery(
    { id: contestId },
    { refetchOnMount: false, refetchOnWindowFocus: false },
  );
}
