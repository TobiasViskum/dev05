"use client";
import ContentItem from "./ContentItem";
import {
  max,
  reps,
  search,
  profiles,
  plus,
  running,
  cycling,
  swimming,
} from "@/assets/images";
import Image from "next/image";
import { usePathname, useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function CardioContent({ currTab }: { currTab: string[] }) {
  const path = usePathname();
  const canCreateExercise =
    path.endsWith("running") ||
    path.endsWith("cycling") ||
    path.endsWith("swimming");

  const params = useParams();
  const uid = params.uid;

  function handleExerciseCreateClick() {
    if (canCreateExercise) {
      const event = new CustomEvent("showCardioOverlay", {
        detail: { overlay: "createExercise" },
      });
      document.dispatchEvent(event);
    }
  }

  return (
    <>
      <ContentItem
        destPath={`/${uid}/cardio/running`}
        image={running}
        text="Running"
        matcher="running"
      />
      <ContentItem
        destPath={`/${uid}/cardio/cycling`}
        image={cycling}
        text="Cycling"
        matcher="cycling"
      />
      <button
        onClick={handleExerciseCreateClick}
        className={twMerge(
          "mt-[-8px] hidden h-14 w-14 rounded-xl bg-news opacity-100 shadow-circle-4xl shadow-white transition-all tn:grid tn:place-items-center",
          canCreateExercise === false
            ? "bg-green-900 shadow-none"
            : "shadow-circle-4xl"
        )}
      >
        <div className="h-9 w-9">
          <Image
            src={plus}
            alt=""
            className={twMerge(
              "transition-all",
              canCreateExercise === false ? "image-gray" : ""
            )}
          />
        </div>
      </button>
      <ContentItem
        destPath={`/${uid}/cardio/swimming`}
        image={swimming}
        text="Swimming"
        matcher="swimming"
      />
      <ContentItem
        destPath={`/${uid}/cardio/search`}
        image={search}
        text="Search"
      />
    </>
  );
}
