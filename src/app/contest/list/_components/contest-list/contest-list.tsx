"use client";

import _ from "lodash-es";
import { useState } from "react";
import { VisibleIfAuthorized } from "~/app/_components/visible-if-authorized";
import { Spinner } from "~/components/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { contestCategories, type ContestCategory } from "~/types/contest";
import { useContests } from "../../_hooks/use-contests";
import { ContestListItem } from "./contest-list-item";
import { CreateContestButton } from "./create-contest-button";

export function ContestList() {
  const [category, setCategory] = useState<ContestCategory>("ongoing");
  const contests = useContests(category);

  return (
    <div className="rounded-xl bg-slate-900 p-4">
      <Tabs
        defaultValue={category}
        onValueChange={(value) => setCategory(value as typeof category)}
      >
        <div className="flex flex-wrap gap-2.5">
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

          <VisibleIfAuthorized>
            <CreateContestButton />
          </VisibleIfAuthorized>
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
              <ul className="flex flex-col gap-2.5">
                {contests.data?.map((contest) => (
                  <ContestListItem key={contest.id} contest={contest} />
                ))}
              </ul>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
