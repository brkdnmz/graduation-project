import { env } from "~/env";

type Nav = {
  href: string;
  label: string;
  title?: string;
};

export const navs: Nav[] = [
  { href: "/contest/list", label: "Contests", title: "Contest List" },
];

if (env.NODE_ENV === "development")
  navs.push({ href: "/dev-tools", label: "Dev Tools" });
