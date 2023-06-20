import { arrowLeft } from "@/assets/images";
import { isTheme } from "@/lib/util/themes";
import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { useSearchParams } from "next/navigation";

interface Props {
  title: string;
  splitPath: string[];
  profileData: ProfileData | null;
}

export default function GoBackButton({ title, splitPath, profileData }: Props) {
  const searchParams = useSearchParams();
  const prevParam = searchParams.get("prev");

  const newHref = prevParam ? prevParam : `/${splitPath[1]}`;

  return (
    <>
      <Link
        href={newHref}
        className={twJoin(
          "absolute left-2 top-2 flex h-8 w-24 items-center",
          title === "start"
            ? "invisible"
            : title === "home"
            ? "invisible"
            : title === ""
            ? "invisible"
            : "visible"
        )}
      >
        <div className="h-3 w-3">
          <Image
            src={arrowLeft}
            alt=""
            className={twJoin(
              "h-full w-full",
              isTheme("blue", profileData) ? "image-light-blue" : "image-blue"
            )}
          />
        </div>
        <p
          className={twJoin(
            "pl-1.5 text-sm",
            isTheme("blue", profileData) ? "text-second" : "text-active"
          )}
        >
          Go Back
        </p>
      </Link>
    </>
  );
}
