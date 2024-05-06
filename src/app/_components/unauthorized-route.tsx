"use client";

import { useRouter } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";
import { Spinner } from "~/components/spinner";
import { toast } from "~/components/ui/use-toast";
import { useSession } from "~/hooks/use-session";

export function UnauthorizedRoute({ children }: PropsWithChildren) {
  const session = useSession();
  const router = useRouter();

  // TODO: Fix triggering after login

  useEffect(() => {
    if (session.user) {
      router.push("/");
      toast({
        variant: "destructive",
        title: "Already logged in",
        description: "You must be logged out",
        duration: 3000,
      });
    }
  }, [router, session.user]);

  if (session.isLoading) return <Spinner />;
  return session.user ? null : children;
}
