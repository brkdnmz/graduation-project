"use client";

import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { Spinner } from "~/components/spinner";
import { useSession } from "~/hooks/use-session";

export function AuthorizedRoute({ children }: PropsWithChildren) {
  const session = useSession();
  const router = useRouter();
  if (session.isLoading) return <Spinner />;
  if (!session.user) {
    router.push("/auth/login");
    return null;
  }
  return children;
}
