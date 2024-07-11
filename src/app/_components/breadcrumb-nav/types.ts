import type React from "react";

type Crumb = React.ReactNode;

export type RouteSegment = {
  children?: Record<string, RouteSegment>;
  notClickable?: boolean;
} & { crumb?: Crumb; dynamic?: boolean };

export type CrumbInfo = { crumb: Crumb; href: string; isClickable?: boolean };
