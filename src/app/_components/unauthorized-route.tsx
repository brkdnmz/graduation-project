import { type PropsWithChildren } from "react";
import { AuthChecker } from "./auth-checker";

export function UnauthorizedRoute({ children }: PropsWithChildren) {
  return <AuthChecker permitIf="unauthorized">{children}</AuthChecker>;
}
