"use client";

import { Loader2 } from "lucide-react";
import type { PropsWithChildren } from "react";
import { useSession } from "~/hooks/use-session";

export function SessionLoader({ children }: PropsWithChildren) {
  const session = useSession();

  return session.isLoading ? (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="animate-spin" size={100} />
    </div>
  ) : (
    children
  );
}
