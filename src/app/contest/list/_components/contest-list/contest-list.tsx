"use client";

import _ from "lodash-es";
import { useState } from "react";
import { Spinner } from "~/components/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { api } from "~/trpc/react";
import { ContestListItem } from "./contest-list-item";
import { CreateContestButton } from "./create-contest-button";

const contestCategories = ["ongoing", "upcoming", "ended"] as const;

export function ContestList() {
  const [category, setCategory] =
    useState<(typeof contestCategories)[number]>("ongoing");
  const contests = api.contest.get.useQuery({ type: category });

  return (
    <div className="rounded-xl bg-slate-900 px-4 py-2">
      <ul className="flex max-h-96 flex-col gap-2 overflow-auto py-2">
        <Tabs
          defaultValue={category}
          onValueChange={(value) => setCategory(value as typeof category)}
        >
          <div className="flex items-center gap-3">
            <TabsList className="h-auto">
              {contestCategories.map((contestType) => (
                <TabsTrigger
                  key={contestType}
                  value={contestType}
                  className="text-base"
                >
                  {_.capitalize(contestType)}
                </TabsTrigger>
              ))}
            </TabsList>

            <CreateContestButton />
          </div>
          {contestCategories.map((contestType) => (
            <TabsContent
              key={contestType}
              value={contestType}
              className="min-h-40"
            >
              {contests.isLoading ? (
                <div className="flex h-40 items-center justify-center">
                  <Spinner />
                </div>
              ) : (
                contests.data?.map((contest) => (
                  <ContestListItem key={contest.id} contest={contest} />
                ))
              )}
            </TabsContent>
          ))}
        </Tabs>
      </ul>
    </div>
  );
}
