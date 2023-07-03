"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { twJoin, twMerge } from "tailwind-merge";
import { usePathname, useSearchParams } from "next/navigation";

export default function ContentItem({
  destPath,
  image,
  text,
  imageSize,
  className,
  matcher,
}: {
  destPath: string;
  image: StaticImageData;
  text: string;
  imageSize?: string;
  className?: string;
  matcher?: string;
}) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const prevParam = searchParams.get("prev")
    ? `?prev=${searchParams.get("prev")}`
    : "";

  const matcherParam = searchParams.get("matcher");

  function getImageColor() {
    if (
      matcher &&
      matcherParam &&
      matcher.toLowerCase() === matcherParam.toLowerCase()
    ) {
      return "image-blue";
    } else if (path === destPath) {
      return "image-blue";
    } else {
      return "image-gray";
    }
  }
  function getTextColor() {
    if (
      matcher &&
      matcherParam &&
      matcher.toLowerCase() === matcherParam.toLowerCase()
    ) {
      return "text-active";
    } else if (path === destPath) {
      return "text-active";
    } else {
      return "text-second";
    }
  }

  return (
    <Link
      href={[destPath, prevParam].join("")}
      className={twMerge("mt-2 flex w-11 flex-col items-center", className)}
    >
      <div className="grid aspect-square h-7 w-7 place-items-center">
        <Image
          priority
          src={image}
          alt="logo"
          className={twJoin(imageSize, getImageColor())}
        />
      </div>
      <p className={twJoin("pt-1 text-xs", getTextColor())}>{text}</p>
    </Link>
  );
}
