import { HomeIcon } from "lucide-react";
import { ContestNameCrumb } from "./contest-name-crumb";
import type { RouteSegment } from "./types";

export const routeToCrumbsMatcher: RouteSegment = {
  crumb: <HomeIcon size={16} strokeWidth={4} />,
  children: {
    auth: {
      children: {
        login: {
          crumb: "Log in",
        },
        signup: {
          crumb: "Sign up",
        },
      },
    },
    contest: {
      crumb: "Contest",
      children: {
        create: {
          crumb: "Create contest",
        },
        list: {
          crumb: "List",
        },
        "[contestId]": {
          dynamic: true,
          crumb: <ContestNameCrumb />,
        },
      },
    },
    user: {
      notClickable: true,
      crumb: "User",
      children: {
        "[username]": {
          dynamic: true,
        },
      },
    },
    "dev-tools": {
      crumb: "Dev Tools",
    },
  },
};
