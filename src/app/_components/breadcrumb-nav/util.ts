import { routeToCrumbsMatcher } from "./matcher";
import type { CrumbInfo, RouteSegment } from "./types";

export function getCrumbs(pathname: string): CrumbInfo[] {
  function recursiveHelper(
    curNode: RouteSegment,
    segments: string[],
    segmentIndex: number,
    href: string,
  ): CrumbInfo[] {
    if (segmentIndex === segments.length) return [];

    const crumb = curNode.dynamic ? segments[segmentIndex] : curNode.crumb;
    const isClickable = !curNode.notClickable && !!curNode.children;

    const curCrumbInfo = { crumb, href, isClickable };

    if (!curNode.children) return [curCrumbInfo];

    const nextSegment = segments[segmentIndex + 1];
    const targetNode = Object.entries(curNode.children).find(
      ([route, childNode]) => route === nextSegment || childNode.dynamic,
    );

    if (targetNode) {
      const nextHref = `${href}/${nextSegment}`;

      const nextCrumbs = recursiveHelper(
        targetNode[1],
        segments,
        segmentIndex + 1,
        nextHref,
      );

      return [curCrumbInfo, ...nextCrumbs];
    } else {
      console.error(
        `Could not properly get breadcrumbs for current route ${pathname}`,
      );

      return [];
    }
  }

  const segments = pathname === "/" ? [] : pathname.split("/");

  const crumbs = recursiveHelper(routeToCrumbsMatcher, segments, 0, "");

  // First is always home
  if (crumbs.length) crumbs[0]!.href = "/";

  return crumbs;
}
