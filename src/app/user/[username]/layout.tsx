import type { PropsWithChildren } from "react";

export default function UserPageLayout({ children }: PropsWithChildren) {
  return <div className="flex-1">{children}</div>;
}
