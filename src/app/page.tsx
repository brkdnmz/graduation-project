"use client";

import { useSession } from "~/hooks/use-session";
import { UsernameLink } from "./_components/username-link";

export default function Home() {
  const { user } = useSession();

  return (
    <main className="flex flex-1 items-center justify-center font-extrabold">
      <h1 className="text-slate-200">
        Hi
        {user?.username && (
          <>
            , <UsernameLink username={user.username} />
          </>
        )}
        !
      </h1>
    </main>
  );
}
