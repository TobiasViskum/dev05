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
        className="mr-auto flex h-8 w-32 cursor-pointer items-center gap-x-1"
      >
        <Image src={arrowLeft} alt="left" className="aspect-square h-4 w-4" />
        <p className="text-lg font-semibold">Go back</p>
      </Link>
    </>
  );
}
