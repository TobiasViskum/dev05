import { profileTobias } from "@/assets/images";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface Props {
  isHeaderTitleActive: boolean;
  title: string;
}

export default function ProfileIcon({ isHeaderTitleActive, title }: Props) {
  return (
    <>
      <div
        className={twMerge(
          "absolute left-2 top-2 aspect-square h-8 w-8 transition-opacity duration-300",
          isHeaderTitleActive ? "opacity-100" : "opacity-0",
          title === "home" ? "visible" : "invisible duration-0"
        )}
      >
        <Image
          src={profileTobias}
          alt="settings"
          className="h-full w-full rounded-full"
        />
      </div>
    </>
  );
}
