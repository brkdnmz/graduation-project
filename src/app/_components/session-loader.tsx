"use client";

import type { PropsWithChildren } from "react";
import { Spinner } from "~/components/spinner";
import { useSession } from "~/hooks/use-session";

export function SessionLoader({ children }: PropsWithChildren) {
  const session = useSession();

  return session.isLoading ? (
    <div className="flex min-h-screen items-center justify-center">
      {<Spinner />}
    </div>
  ) : (
    children
  );
}
