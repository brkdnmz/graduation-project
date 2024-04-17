"use client";
import type { PropsWithChildren } from "react";
import { useSession } from "~/hooks/use-session";

export function VisibleIfAuthorized({ children }: PropsWithChildren) {
  const session = useSession();
  return !session.isLoading && session.user ? children : null;
}
