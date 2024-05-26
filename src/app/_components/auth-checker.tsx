import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";
import { api } from "~/trpc/server";

type AuthCheckerProps = PropsWithChildren & {
  permitIf: "authorized" | "unauthorized";
};

export async function AuthChecker({ children, permitIf }: AuthCheckerProps) {
  let isAuthorized = false;

  try {
    await api.session.getSession.query();
    isAuthorized = true;
  } catch (error) {
    console.log(error);
  }

  // redirect internally throws an error so it should be called outside of try/catch blocks.
  // https://nextjs.org/docs/app/building-your-application/routing/redirecting#redirect-function
  if (isAuthorized && permitIf === "unauthorized") redirect("/");
  if (!isAuthorized && permitIf === "authorized") redirect("/auth/login");
  return <>{children}</>;
}
