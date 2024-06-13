"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { getCrumbs } from "./util";

export function BreadcrumbNav() {
  const pathname = usePathname();

  const crumbs = getCrumbs(pathname).filter(({ crumb }) => crumb);

  return (
    crumbs.length > 0 && (
      <Breadcrumb className="px-1 py-2">
        <BreadcrumbList>
          {crumbs.map(({ crumb, href, isClickable }, crumbIndex) => (
            <React.Fragment key={href}>
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="text-lg">
                  {isClickable ? (
                    <Link href={href} className="font-bold">
                      {crumb}
                    </Link>
                  ) : (
                    <span className="hover:text-inherit">{crumb}</span>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
              {crumbIndex + 1 !== crumbs.length && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    )
  );
}
