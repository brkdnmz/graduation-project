import type { PropsWithChildren } from "react";
import { UnauthorizedRoute } from "../_components/unauthorized-route";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container grid grow grid-cols-8 items-center">
      <div className="col-span-full lg:col-span-4 lg:col-start-3">
        <UnauthorizedRoute>{children}</UnauthorizedRoute>
      </div>
    </div>
  );
}
