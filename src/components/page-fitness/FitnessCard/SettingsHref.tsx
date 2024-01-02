"use client";

import { settingsPng } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SettingsHref({ strExerciseData }: { strExerciseData: string }) {
  const exerciseData = JSON.parse(strExerciseData);

  const path = usePathname();
  let matcher = "reps";
  if (path.endsWith("max")) {
    matcher = "max";
  }

  return (
    <Link
      href={`/${exerciseData.uid}/fitness/${exerciseData.id}?matcher=${matcher}&prev=/${exerciseData.uid}/fitness/${matcher}`}
      className="absolute -bottom-1 right-0 h-8 w-8 rounded-full p-1.5"
    >
      <Image priority src={settingsPng} alt="SET" className="image-blue" />
    </Link>
  );
}
