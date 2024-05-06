"use client";

import { useRouter } from "next/navigation";
import { useEffect, type PropsWithChildren } from "react";
import { Spinner } from "~/components/spinner";
import { toast } from "~/components/ui/use-toast";
import { useSession } from "~/hooks/use-session";

export function AuthorizedRoute({ children }: PropsWithChildren) {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session.user) {
      router.push("/auth/login");
      toast({
        variant: "destructive",
        title: "Unauthorized",
        description: "You must be logged in",
        duration: 3000,
      });
    }
  }, [router, session.user]);

  if (session.isLoading) return <Spinner />;
  return !session.user ? null : children;
}
