import type { PropsWithChildren } from "react";
import { AuthorizedRoute } from "~/app/_components/authorized-route";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <AuthorizedRoute>
      <div className="container grid grow grid-cols-8 items-center">
        <div className="col-span-full lg:col-span-4 lg:col-start-3">
          {children}
        </div>
      </div>
    </AuthorizedRoute>
  );
}
