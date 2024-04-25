"use client";

import { CircleUserRound, LogOutIcon } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
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
    <DropdownMenu>
      <DropdownMenuTrigger type="button" className="outline-none">
        <div className="rounded-full p-0.5 transition hover:bg-slate-400/20">
          <CircleUserRound />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" className="mr-4">
        {user && (
          <>
            <DropdownMenuLabel>{user?.username}</DropdownMenuLabel>
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button
                onClick={onLogOut}
                className="flex w-full gap-2 opacity-50 transition-opacity hover:opacity-100"
              >
                <LogOutIcon />
                Log Out
              </button>
            </DropdownMenuItem>
          </>
        )}
        {!user && (
          <>
            <DropdownMenuItem asChild>
              <Link
                href="/auth/signup"
                title="Sign Up"
                className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
              >
                Sign Up
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href="/auth/login"
                title="Log In"
                className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
              >
                Log In
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
    // <Popover>
    //   <PopoverTrigger>
    //     {user ? user.username : <CircleUserRound />}
    //   </PopoverTrigger>
    //   <PopoverContent className="flex w-fit flex-col gap-2">
    //     {user && (
    //       <>
    //         {user?.email}
    //         <button onClick={onLogOut}>Log Out</button>
    //       </>
    //     )}
    //     {!user && (
    //       <>
    //         <Link
    //           href="/auth/signup"
    //           title="Sign Up"
    //           className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
    //         >
    //           Sign Up
    //         </Link>
    //         <Link
    //           href="/auth/login"
    //           title="Log In"
    //           className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
    //         >
    //           Log In
    //         </Link>
    //       </>
    //     )}
    //   </PopoverContent>
    // </Popover>
  );
}
