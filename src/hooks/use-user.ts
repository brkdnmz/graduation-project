"use client";

import type { User } from "@prisma/client";
import { api } from "~/trpc/react";

type UseUserProps = {
  userId?: User["id"];
  username?: User["username"];
};

export function useUser({ userId, username }: UseUserProps) {
  const query = api.user.getUser.useQuery(
    { id: userId, username },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  );

  return query;
}
