"use client";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";

export default function LeftNavigation() {
  const path = usePathname();

  if (path === "/") return <></>;

  return (
    <>
      <div
        className={twJoin(
          "h-[calc(100svh_-_64px)] w-full max-w-[calc(min(calc(100svw_-_17px),_var(--document-max-width))_-_892px_-_24px_-_32px)]",
          "z-20 top-16 fixed flex pt-6 pr-12 bg-red-600"
        )}
      >
        <h1 className="text-3xl">Quick Navigation</h1>
        <div></div>
      </div>
    </>
  );
}
