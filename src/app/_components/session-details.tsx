"use client";

import { useSession } from "~/hooks/use-session";

export function SessionDetails() {
  const session = useSession();

  return <div>{JSON.stringify(session.data)}</div>;
}
