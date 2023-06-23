"use client";
import { useSearchParams, usePathname } from "next/navigation";
import { arrowLeft } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";

export default function GoBack() {
  const path = usePathname();
  const splitPath = path.split("/");

  const searchParams = useSearchParams();
  const prevParam = searchParams.get("prev");

  const newHref = prevParam ? prevParam : `/${splitPath[1]}`;

  if (splitPath.length === 2) return <></>;

  return (
    <>
      <Link
        href={newHref}
        className="w-32 h-8 flex items-center gap-x-1 cursor-pointer"
      >
        <Image src={arrowLeft} alt="left" className="h-4 w-4 aspect-square" />
        <p className="font-semibold text-lg">Go back</p>
      </Link>
    </>
  );
}
