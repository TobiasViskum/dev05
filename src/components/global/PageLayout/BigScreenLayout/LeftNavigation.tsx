"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { twJoin } from "tailwind-merge";
import { useState } from "react";

export default function LeftNavigation() {
  const path = usePathname();
  const params = useParams();
  const uid = params.uid;
  const [activeLinkHeading, setActiveLinkHeading] = useState("");

  const linkLayout = [
    {
      heading: "Fitness",
      partialHref: `/${uid}/fitness`,
      links: [
        { title: "Reps", href: `/${uid}/fitness/reps` },
        { title: "Max", href: `/${uid}/fitness/max` },
        { title: "Profiles", href: `/${uid}/fitness/profiles` },
        { title: "Search", href: `/${uid}/fitness/search` },
      ],
    },
    {
      heading: "Cardio",
      partialHref: `/${uid}/cardio`,
      links: [
        { title: "Running", href: `/${uid}/cardio/running` },
        { title: "Cycling", href: `/${uid}/cardio/cycling` },
        { title: "Swimming", href: `/${uid}/cardio/swimming` },
        { title: "Search", href: `/${uid}/cardio/search` },
      ],
    },
  ];

  if (path === "/") return <></>;

  return (
    <>
      <div className="relative hidden w-full xl:flex">
        <div
          className={twJoin(
            "h-[calc(100svh_-_64px)] w-full max-w-[calc(min(calc(100svw_-_17px),_var(--document-max-width))_-_892px_-_24px_-_32px)]",
            "fixed top-16 z-20 flex flex-col gap-y-4 pr-12 pt-6"
          )}
        >
          <h1 className="mb-8 text-3xl font-medium">Quick Navigation</h1>
          {linkLayout.map((item, index) => {
            return (
              <>
                <div className="flex flex-col items-end">
                  <div className="flex w-full flex-col items-center gap-y-2">
                    <button
                      className="group flex w-full items-center gap-x-2"
                      onClick={() =>
                        activeLinkHeading === item.heading
                          ? setActiveLinkHeading("")
                          : setActiveLinkHeading(item.heading)
                      }
                    >
                      <h2
                        className={twJoin(
                          "text-lg font-medium transition-colors group-hover:text-first",
                          activeLinkHeading === item.heading
                            ? "text-active"
                            : "text-first"
                        )}
                      >
                        {item.heading}
                      </h2>
                      <hr
                        className={twJoin(
                          "w-full border-t border-solid transition-colors group-hover:border-[var(--text-first)]",
                          activeLinkHeading === item.heading
                            ? "border-[var(--text-active)]"
                            : "border-[var(--text-first)]"
                        )}
                      />
                      <svg
                        className={twJoin(
                          "transition-colors group-hover:text-first",
                          activeLinkHeading === item.heading
                            ? "text-active"
                            : "text-first"
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
                            activeLinkHeading === item.heading
                              ? "M6 9l6 6 6-6"
                              : "M9 18l6-6-6-6"
                          }
                        ></path>
                      </svg>
                    </button>
                    <div
                      className="grid w-full transition-grid"
                      style={{
                        gridTemplateRows:
                          activeLinkHeading === item.heading ? "1fr" : "0fr",
                      }}
                    >
                      {" "}
                      <div className="flex items-center gap-x-8 overflow-hidden pl-4">
                        <div className="h-full border-l border-solid border-inactive" />
                        <div className="grid w-full gap-y-1">
                          {item.links.map((link, index2) => {
                            return (
                              <>
                                <Link
                                  href={link.href}
                                  className={twJoin(
                                    "transition-colors hover:text-first",
                                    path === link.href
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
          })}
        </div>
      </div>
    </>
  );
}
