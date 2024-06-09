"use client";

import type { PropsWithChildren } from "react";
import { useSession } from "~/hooks/use-session";
import { PageLoader } from "./page-loader";

export function SessionLoader({ children }: PropsWithChildren) {
  const session = useSession();

  return session.isLoading ? <PageLoader /> : children;
}
