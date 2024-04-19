"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useRevalidateSession, useSession } from "~/hooks/use-session";
import { api } from "~/trpc/react";

export function ProfileButton() {
  const { user } = useSession();
  const logOut = api.auth.logout.useMutation();
  const revalidateSession = useRevalidateSession();

  const onLogOut = async () => {
    await logOut.mutateAsync();
    await revalidateSession();
  };

  return (
    <Popover>
      <PopoverTrigger>{user?.username}</PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <span>ID: {user?.id}</span>
        <span>Email: {user?.email}</span>
        <span>Username: {user?.username}</span>
        <span>Registered at: {user?.createdAt.toLocaleString()}</span>
        <button onClick={onLogOut}>Log Out</button>
      </PopoverContent>
    </Popover>
  );
}
