"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { RouterOutputs } from "~/trpc/shared";

export function UserDetails({
  user,
}: {
  user?: RouterOutputs["user"]["getUser"];
}) {
  return (
    <Popover>
      <PopoverTrigger>{user?.username}</PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <span>{user?.id}</span>
        <span>{user?.createdAt.toLocaleString()}</span>
        <span>{user?.email}</span>
        <span>{user?.username}</span>
      </PopoverContent>
    </Popover>
  );
}
