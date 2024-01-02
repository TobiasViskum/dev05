"use client";
import ContentItem from "./ContentItem";
import { max, reps, search, profiles, plus } from "@/assets/images";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export default function FitnessContent({ currTab }: { currTab: string[] }) {
  const path = usePathname();
  const canCreateExercise = path.endsWith("max") || path.endsWith("reps");

  function handleExerciseCreateClick() {
    if (canCreateExercise) {
      const event = new CustomEvent("showFitnessOverlay", {
        detail: { overlay: "createExercise" },
      });
      document.dispatchEvent(event);
    }
  }

  return (
    <>
      <ContentItem
        destPath={`/${currTab[1]}/fitness/max`}
        image={max}
        text="Max"
        imageSize="h-5/6 w-5/6"
        matcher="max"
      />
      <ContentItem
        destPath={`/${currTab[1]}/fitness/reps`}
        image={reps}
        text="Reps"
        matcher="reps"
      />
      <button
        onClick={handleExerciseCreateClick}
        className={twMerge(
          "mt-[-8px] hidden h-14 w-14 rounded-xl bg-news opacity-100 shadow-circle-4xl shadow-white transition-all tn:grid tn:place-items-center",
          canCreateExercise === false ? "bg-green-900 shadow-none" : "shadow-circle-4xl"
        )}
      >
        <div className="h-9 w-9">
          <Image
            src={plus}
            alt=""
            className={twMerge("transition-all", canCreateExercise === false ? "image-gray" : "")}
          />
        </div>
      </button>
      <ContentItem destPath={`/${currTab[1]}/fitness/search`} image={search} text="Search" />
      <ContentItem destPath={`/${currTab[1]}/fitness/profiles`} image={profiles} text="Profiles" />
    </>
  );
}
