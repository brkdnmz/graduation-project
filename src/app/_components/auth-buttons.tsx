"use client";

import Link from "next/link";
import { useSession } from "~/hooks/use-session";
import { ProfileButton } from "./profile-button";

export function AuthButtons() {
  const { user } = useSession();

  return user ? (
    <ProfileButton />
  ) : (
    <>
      <Link
        href="/auth/signup"
        title="Sign Up"
        className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
      >
        <h1 className="text-2xl text-slate-300">Sign Up</h1>
      </Link>
      <Link
        href="/auth/login"
        title="Log In"
        className="flex items-center self-stretch opacity-50 transition-opacity hover:opacity-100"
      >
        <h1 className="text-2xl text-slate-300">Log In</h1>
      </Link>
    </>
  );
}
