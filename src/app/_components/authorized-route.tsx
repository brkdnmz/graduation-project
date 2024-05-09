import { type PropsWithChildren } from "react";
import { AuthChecker } from "./auth-checker";

export function AuthorizedRoute({ children }: PropsWithChildren) {
  return <AuthChecker permitIf="authorized">{children}</AuthChecker>;
}
