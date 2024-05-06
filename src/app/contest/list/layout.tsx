import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <div className="container">{children}</div>;
}
