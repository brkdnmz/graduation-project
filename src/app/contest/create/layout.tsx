import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid grow grid-cols-8 items-center">
      <div className="col-span-4 col-start-3">{children}</div>
    </div>
  );
}
