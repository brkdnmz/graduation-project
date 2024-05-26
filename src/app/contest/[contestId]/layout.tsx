import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <main className="container">{children}</main>;
}
