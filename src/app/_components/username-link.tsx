import type { User } from "@prisma/client";
import Link, { type LinkProps } from "next/link";
import { forwardRef, type ForwardedRef } from "react";

type UsernameLinkProps = {
  username: User["username"];
} & Omit<LinkProps, "href">;

export const UsernameLink = forwardRef(function UsernameLink(
  { username, ...props }: UsernameLinkProps,
  forwardedRef: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Link {...props} href={`/user/${username}`} ref={forwardedRef}>
      {username}
    </Link>
  );
});
