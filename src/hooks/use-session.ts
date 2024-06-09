"use client";

import { TRPCClientError } from "@trpc/client";
import { useCallback } from "react";
import { api } from "~/trpc/react";

export function useSession() {
  const session = api.session.getSession.useQuery(undefined, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry(failureCount, error) {
      if (error instanceof TRPCClientError) {
        return false;
      }
      return failureCount < 3;
    },
  });

  return {
    ...session,
    user: session.error ? null : session.data,
  };
}

export function useRevalidateSession() {
  const trpcUtils = api.useUtils();

  return useCallback(() => trpcUtils.session.invalidate(), [trpcUtils.session]);
}
