"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { PropsWithChildren } from "react";
import { useSession } from "~/hooks/use-session";

export function AuthorizedRoute({ children }: PropsWithChildren) {
  const session = useSession();
  const router = useRouter();
  if (session.isLoading) return <Loader2 />;
  if (!session.user) {
    router.push("/auth/login");
    return null;
  }
  return children;
}
