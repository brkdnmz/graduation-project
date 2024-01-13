import type { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="grid grow grid-cols-8 items-center">
      <div className="col-span-2 col-start-4">{children}</div>
    </div>
  );
}
