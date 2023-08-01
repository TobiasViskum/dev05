"use client";

import { useContext, useEffect } from "react";
import { LeftNavigationContext } from "./LeftNavigation";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { usePathname } from "next/navigation";

export default function SingleLink({
  title,
  href,
}: {
  title: string;
  href: string;
}) {
  const path = usePathname();
  const context = useContext(LeftNavigationContext);
  const changeActiveLinkHeading = context.changeActiveLinkHeading;
  const activeLinkHeading = context.activeLinkHeading;

  useEffect(() => {
    if (path === href) {
      changeActiveLinkHeading(title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, href]);

  return (
    <button
      className="group flex w-full items-center gap-x-2"
      onClick={() =>
        activeLinkHeading === title
          ? changeActiveLinkHeading("")
          : changeActiveLinkHeading(title)
      }
    >
      <Link
        href={href}
        className={twJoin(
          "text-lg font-medium transition-colors group-hover:text-active",
          activeLinkHeading === title ? "text-first" : "text-second"
        )}
      >
        {title}
      </Link>
    </button>
  );
}
