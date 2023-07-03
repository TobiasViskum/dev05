import { settingsPng } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams, useSearchParams } from "next/navigation";

interface Props {
  splitPath: string[];
}

export default function SettingsButton({ splitPath }: Props) {
  const path = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const uid = params.uid;
  const matcherParam = searchParams.get("matcher");
  const href = matcherParam
    ? `/${uid}/settings?prev=${path}&matcher=${matcherParam}`
    : `/${uid}/settings?prev=${path}`;

  if (splitPath[splitPath.length - 1] === "settings") {
    return <></>;
  }

  return (
    <>
      <Link
        href={href}
        className="absolute right-2 top-2 aspect-square h-8 w-8"
      >
        <Image
          src={settingsPng}
          alt="settings"
          className="image-blue h-full w-full"
        />
      </Link>
    </>
  );
}
