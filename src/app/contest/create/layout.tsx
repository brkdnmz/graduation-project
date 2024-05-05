import type { PropsWithChildren } from "react";
import { AuthorizedRoute } from "~/app/_components/authorized-route";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthorizedRoute>
      <div className="grid grow grid-cols-8 items-center">
        <div className="col-span-full md:col-span-4 md:col-start-3">
          {children}
        </div>
      </div>
    </AuthorizedRoute>
  );
}
