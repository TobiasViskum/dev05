import { settingsPng } from "@/assets/images";
import { isTheme } from "@/lib/util/themes";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
  splitPath: string[];
  profileData: ProfileData | null;
}

export default function SettingsButton({ splitPath, profileData }: Props) {
  const uid = splitPath[1];

  if (splitPath[splitPath.length - 1] === "settings") {
    return <></>;
  }

  return (
    <>
      <Link
        href={`/${uid}/settings`}
        className="absolute right-2 top-2 aspect-square h-8 w-8"
      >
        <Image
          src={settingsPng}
          alt="settings"
          className={twMerge(
            "h-full w-full",
            isTheme("blue", profileData) ? "image-light-blue" : "image-blue"
          )}
        />
      </Link>
    </>
  );
}
