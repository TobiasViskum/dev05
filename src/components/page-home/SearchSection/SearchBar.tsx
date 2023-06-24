"use client";
import Image from "next/image";
import { search } from "@/assets/images";
import { twJoin } from "tailwind-merge";
import { Input } from "@/components/global";
import { isTheme } from "@/lib/util/themes";
import { useAppSelector } from "@/store/useClient";

export default function SearchBar() {
  function handleFocus(newState: boolean) {}

  const profileData = useAppSelector((state) => state.userData.profileData);

  return (
    <>
      <div
        className={twJoin(
          "flex w-full min-w-small max-w-small items-center rounded-md bg-first text-base",
          isTheme("blue", profileData)
            ? "border-none bg-second"
            : "border border-solid border-inactive"
        )}
        id="searchbar"
      >
        <div className="grid aspect-square h-7 w-7 place-items-center p-1">
          <Image
            priority
            src={search}
            alt="search icon"
            className={twJoin(
              "h-full w-full",
              isTheme("blue", profileData) ? "image-light-blue" : "image-gray"
            )}
          />
        </div>
        <div
          className={twJoin(
            "h-4 w-2 border-0 border-l border-solid",
            isTheme("blue", profileData)
              ? "border-[var(--text-second)]"
              : "border-inactive"
          )}
        />
        <Input
          id="searchInput"
          spellCheck={false}
          placeholder="Search..."
          onFocus={(e) => handleFocus(true)}
          onBlur={() => handleFocus(false)}
          className={twJoin(
            "mr-2 w-full border-0 py-0 text-base text-first outline-0"
          )}
        />
      </div>
    </>
  );
}
