"use client";
import Link from "next/link";
import { usePathname, useParams, useSearchParams } from "next/navigation";
import { twJoin } from "tailwind-merge";
import { useEffect, useState, createContext } from "react";
import SingleLink from "./SingleLink";
import { getLinkLayout } from "@/lib/util/linkLayout";
import MultipleLinks from "./MultipleLinks";

const initialValue: {
  changeActiveLinkHeading: (title: string) => void;
  activeLinkHeading: string;
} = {
  changeActiveLinkHeading: () => {},
  activeLinkHeading: "",
};

export const LeftNavigationContext = createContext(initialValue);

export default function LeftNavigation() {
  const path = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const uid = params.uid;
  const [activeLinkHeading, setActiveLinkHeading] = useState("");

  const linkLayout = getLinkLayout(uid);

  useEffect(() => {
    if (path.split("/").length === 2) {
      setActiveLinkHeading("Home");
    } else if (path.includes("fitness")) {
      setActiveLinkHeading("Fitness");
    } else if (path.includes("cardio")) {
      setActiveLinkHeading("Cardio");
    }
  }, [path]);

  function changeActiveLinkHeading(title: string) {
    setActiveLinkHeading(title);
  }

  if (path === "/") return <></>;
  return (
    <LeftNavigationContext.Provider
      value={{
        changeActiveLinkHeading: changeActiveLinkHeading,
        activeLinkHeading: activeLinkHeading,
      }}
    >
      <div className="relative ml-4 hidden w-full xl:flex">
        <div
          className={twJoin(
            "h-[calc(100svh_-_64px)] w-full max-w-[calc(min(calc(100svw_-_17px),_var(--document-max-width))_-_892px_-_24px_-_32px)]",
            "fixed top-16 z-20 flex flex-col gap-y-4 pr-12 pt-6"
          )}
        >
          <h1 className="mb-8 text-3xl font-medium">Quick Navigation</h1>
          {linkLayout.map((item, index) => {
            if (item.links.length === 0) {
              return (
                <>
                  <SingleLink
                    key={index}
                    title={item.heading}
                    href={item.href}
                  />
                </>
              );
            } else {
              return (
                <>
                  <MultipleLinks
                    key={index}
                    heading={item.heading}
                    links={item.links}
                  />
                </>
              );
            }
          })}
        </div>
      </div>
    </LeftNavigationContext.Provider>
  );
}
