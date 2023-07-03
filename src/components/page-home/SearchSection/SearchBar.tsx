"use client";
import Image from "next/image";
import { search } from "@/assets/images";
import { twJoin } from "tailwind-merge";
import { useAppSelector } from "@/store/useClient";

export default function SearchBar() {
  function handleFocus(newState: boolean) {}

  const profileData = useAppSelector((state) => state.userData.profileData);

  return (
    <>
      <div
        className={twJoin(
          "flex w-full min-w-small max-w-small items-center rounded-md bg-first text-base",
          "border border-solid border-inactive"
        )}
        id="searchbar"
      >
        <div className="grid aspect-square h-7 w-7 place-items-center p-1">
          <Image
            priority
            src={search}
            alt="search icon"
            className="image-gray h-full w-full"
          />
        </div>
        <div className="h-4 w-2 border-0 border-l border-solid border-inactive" />
        <input
          id="searchInput"
          spellCheck={false}
          placeholder="Search..."
          onFocus={(e) => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          className="mr-2 w-full border-0 bg-first py-0 text-base text-first placeholder-[var(--text-second)] outline-0"
        />
      </div>
    </>
  );
}
