"use client";

import { useParams } from "next/navigation";
import { useContest } from "~/hooks/use-contest";

// Took me too long to think of this solution...
export function ContestNameCrumb() {
  const params = useParams();
  const contestIdStr = params.contestId;
  const contestId = Number(contestIdStr);

  const { data: contest, isLoading, isError } = useContest(contestId);

  if (typeof contestIdStr !== "string") return "Unknown contest";

  return isLoading
    ? "Loading..."
    : isError || !contest
      ? "Unknown contest"
      : contest.name;
}
