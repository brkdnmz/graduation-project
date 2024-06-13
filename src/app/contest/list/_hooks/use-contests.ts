"use client";

import { api } from "~/trpc/react";
import type { ContestCategory } from "~/types/contest";

export function useContests(category: ContestCategory) {
  return api.contest.get.useQuery({ type: category });
}
