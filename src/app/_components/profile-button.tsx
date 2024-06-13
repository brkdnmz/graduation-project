"use client";

import { CircleUserRound, LogOutIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { toast } from "~/components/ui/use-toast";
import { useRevalidateSession, useSession } from "~/hooks/use-session";
import { api } from "~/trpc/react";
import revalidateCache from "../actions";
import { ProfilePicture } from "./profile-picture";
import { UsernameLink } from "./username-link";

export function ProfileButton() {
  const { user } = useSession();
  const router = useRouter();
  const logOut = api.auth.logout.useMutation();
  const revalidateSession = useRevalidateSession();

  const onLogOut = async () => {
    logOut.mutate(undefined, {
      onSuccess: () => {
        void revalidateSession();
        void revalidateCache();
        router.push("/");
        toast({
          variant: "default",
          title: "Logged out",
          description: "Successfully logged out",
          duration: 3000,
        });
      },
      onError: () => {
        alert("An error occurred");
      },
    });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        type="button"
        className="flex items-center justify-center rounded-full outline-none"
      >
        {!user ? (
          <div className="opacity-50 transition hover:opacity-100">
            <CircleUserRound size={40} />
          </div>
        ) : (
          <ProfilePicture
            userId={user.id}
            size={40}
            className="transition hover:brightness-75"
            title={user.username}
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="bottom" align="end">
        {user && (
          <>
            <DropdownMenuItem asChild>
              <UsernameLink username={user.username} />
            </DropdownMenuItem>
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
  );
}
