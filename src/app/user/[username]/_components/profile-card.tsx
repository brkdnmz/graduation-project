import type { PropsWithChildren } from "react";

export function ProfileCard({ children }: PropsWithChildren) {
  return <div className="rounded-lg bg-slate-900 p-4">{children}</div>;
}
