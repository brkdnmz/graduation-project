import type { PropsWithChildren } from "react";

export default function UserPageLayout({ children }: PropsWithChildren) {
  return <div className="container flex-1">{children}</div>;
}
