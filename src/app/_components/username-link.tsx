import type { User } from "@prisma/client";
import Link, { type LinkProps } from "next/link";
import { forwardRef, type ForwardedRef } from "react";
import { cn } from "~/lib/utils";

type UsernameLinkProps = {
  username: User["username"];
  className?: string;
} & Omit<LinkProps, "href">;

export const UsernameLink = forwardRef(function UsernameLink(
  { username, ...props }: UsernameLinkProps,
  forwardedRef: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Link
      {...props}
      className={cn(
        "transition-colors hover:text-muted-foreground",
        props.className,
      )}
      href={`/user/${username}`}
      ref={forwardedRef}
    >
      {username}
    </Link>
  );
});
