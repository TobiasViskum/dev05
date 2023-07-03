import { arrowLeft } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { twJoin } from "tailwind-merge";
import { useSearchParams, useParams } from "next/navigation";

interface Props {
  title: string;
}

export default function GoBackButton({ title }: Props) {
  const searchParams = useSearchParams();
  const prevParam = searchParams.get("prev");
  const matcherParam = searchParams.get("matcher");
  const params = useParams();

  const newHref = prevParam
    ? [prevParam, matcherParam && `?matcher=${matcherParam}`].join("")
    : [`/${params.uid}`, matcherParam && `?matcher=${matcherParam}`].join("");

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
          <Image src={arrowLeft} alt="" className="image-blue h-full w-full" />
        </div>
        <p className="pl-1.5 text-sm text-active">Go Back</p>
      </Link>
    </>
  );
}
