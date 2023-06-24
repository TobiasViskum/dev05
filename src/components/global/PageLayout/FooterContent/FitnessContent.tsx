"use client";
import ContentItem from "./ContentItem";
import { max, reps, search, profiles, plus } from "@/assets/images";
import Image from "next/image";

export default function FitnessContent({ currTab }: { currTab: string[] }) {
  function handleExerciseCreateClick() {
    const event = new CustomEvent("showFitnessOverlay", {
      detail: { overlay: "createExercise" },
    });
    document.dispatchEvent(event);
  }

  return (
    <>
      <ContentItem
        destPath={`/${currTab[1]}/fitness/max`}
        image={max}
        text="Max"
        imageSize="h-5/6 w-5/6"
      />
      <ContentItem
        destPath={`/${currTab[1]}/fitness/reps`}
        image={reps}
        text="Reps"
      />
      <button
        onClick={handleExerciseCreateClick}
        className="mt-[-8px] hidden h-14 w-14 rounded-xl bg-news shadow-circle-4xl shadow-white tn:grid tn:place-items-center"
      >
        <div className="h-9 w-9">
          <Image src={plus} alt="" />
        </div>
      </button>
      <ContentItem
        destPath={`/${currTab[1]}/fitness/search`}
        image={search}
        text="Search"
      />
      <ContentItem
        destPath={`/${currTab[1]}/fitness/profiles`}
        image={profiles}
        text="Profiles"
      />
    </>
  );
}
