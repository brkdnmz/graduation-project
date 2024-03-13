"use client";

import { api } from "~/trpc/react";
import { ContestListItem } from "./contest-list-item";

export function ContestList() {
  const contests = api.contest.getAll.useQuery();

  return (
    <div className="rounded-xl border-2 border-slate-900 bg-gradient-to-b from-slate-700 to-slate-900 px-4 py-2">
      <div className="overflow-auto">
        <h2 className="border-b border-slate-500 pb-4">Contests</h2>
        <ul className="flex max-h-96 flex-col gap-2 overflow-auto py-2">
          {contests.data?.map((contest) => (
            <ContestListItem key={contest.id} contest={contest} />
          ))}
        </ul>
      </div>
    </div>
  );
}
