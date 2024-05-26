"use client";

import type { Contest } from "@prisma/client";
import { Button } from "~/components/ui/button";
import { toast } from "~/components/ui/use-toast";
import { useSession } from "~/hooks/use-session";
import { api } from "~/trpc/react";

export function RegisterButton({ contest }: { contest: Contest }) {
  const session = useSession();
  const registerCurrentUserToContest =
    api.contest.registerCurrentUser.useMutation();

  if (!session) return null;

  const onRegister = () => {
    registerCurrentUserToContest.mutate(
      { contestId: contest.id },
      {
        onSuccess: () => {
          toast({
            variant: "default",
            title: "Success",
            description: `Registered to contest ${contest.name}`,
            duration: 3000,
          });
        },
        onError: (error) => {
          toast({
            variant: "destructive",
            title: "Failed to register",
            description: error.message,
            duration: 3000,
          });
        },
      },
    );
  };

  return <Button onClick={onRegister}>Register</Button>;
}
