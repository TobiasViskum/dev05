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
}: {
  destPath: string;
  image: StaticImageData;
  text: string;
  imageSize?: string;
  className?: string;
}) {
  const path = usePathname();
  const searchParams = useSearchParams();
  const prevParam = searchParams.get("prev")
    ? `?prev=${searchParams.get("prev")}`
    : "";

  function getImageColor() {
    if (path === destPath) {
      return "image-blue";
    } else {
      return "image-gray";
    }
  }
  function getTextColor() {
    if (path === destPath) {
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
