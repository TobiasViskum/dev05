"use client";

import { useContext } from "react";
import { LeftNavigationContext } from "./LeftNavigation";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { usePathname, useSearchParams } from "next/navigation";

export default function MultipleLinks({
  heading,
  links,
}: {
  heading: string;
  links: { title: string; href: string; matcher: string }[];
}) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const context = useContext(LeftNavigationContext);
  const activeLinkHeading = context.activeLinkHeading;
  const changeActiveLinkHeading = context.changeActiveLinkHeading;

  return (
    <>
      <div className="flex flex-col items-end">
        <div className="flex w-full flex-col items-center gap-y-2">
          <button
            className="group flex w-full items-center gap-x-2"
            onClick={() =>
              activeLinkHeading === heading
                ? changeActiveLinkHeading("")
                : changeActiveLinkHeading(heading)
            }
          >
            <h2
              className={twJoin(
                "text-lg font-medium transition-colors group-hover:text-active",
                activeLinkHeading === heading ? "text-first" : "text-second"
              )}
            >
              {heading}
            </h2>
            <hr
              className={twJoin(
                "w-full border-t border-solid transition-colors group-hover:border-[var(--text-active)]",
                activeLinkHeading === heading
                  ? "border-[var(--text-first)]"
                  : "border-[var(--text-second)]"
              )}
            />
            <svg
              className={twJoin(
                "transition-colors group-hover:text-active",
                activeLinkHeading === heading ? "text-first" : "text-second"
              )}
              height="24"
              shape-rendering="geometricPrecision"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              width="24"
              style={{
                width: 24,
                height: 24,
              }}
            >
              <path
                d={
                  activeLinkHeading === heading
                    ? "M6 9l6 6 6-6"
                    : "M9 18l6-6-6-6"
                }
              ></path>
            </svg>
          </button>
          <div
            className="grid w-full transition-grid"
            style={{
              gridTemplateRows: activeLinkHeading === heading ? "1fr" : "0fr",
            }}
          >
            {" "}
            <div className="flex items-center gap-x-8 overflow-hidden pl-4">
              <div className="h-full border-l border-solid border-inactive" />
              <div className="grid w-full gap-y-1">
                {links.map((link, index2) => {
                  return (
                    <>
                      <Link
                        href={link.href}
                        className={twJoin(
                          "transition-colors hover:text-first",
                          path === link.href ||
                            searchParams.get("matcher") === link.matcher
                            ? "text-first"
                            : "text-second"
                        )}
                      >
                        {link.title}
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
