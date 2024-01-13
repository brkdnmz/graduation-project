"use client";

import { api } from "~/trpc/react";

export function useSession() {
  const session = api.session.getSession.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return session;
}
