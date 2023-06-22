import { settingsPng } from "@/assets/images";
import { isTheme } from "@/lib/util/themes";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

interface Props {
  splitPath: string[];
}

export default function SettingsButton({ splitPath }: Props) {
  const path = usePathname();
  const uid = splitPath[1];

  if (splitPath[splitPath.length - 1] === "settings") {
    return <></>;
  }

  return (
    <>
      <Link
        href={`/${uid}/settings?prev=${path}`}
        className="absolute right-2 top-2 aspect-square h-8 w-8"
      >
        <Image src={settingsPng} alt="settings" className="h-full w-full" />
      </Link>
    </>
  );
}
