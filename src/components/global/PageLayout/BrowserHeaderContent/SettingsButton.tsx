import { settingsPng } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SettingsButton() {
  const path = usePathname();
  const splitPath = path.split("/");
  const uid = splitPath[1];

  if (splitPath[splitPath.length - 1] === "settings") {
    return <></>;
  }

  return (
    <>
      <Link
        href={`/${uid}/settings?prev=${path}`}
        className="h-8 ml-auto font-semibold text-lg flex items-center gap-x-2"
      >
        <p>Settings</p>
        <Image src={settingsPng} alt="set" className="h-6 w-6 aspect-square" />
      </Link>
    </>
  );
}
