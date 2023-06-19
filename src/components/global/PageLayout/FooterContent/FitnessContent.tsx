"use client";
import ContentItem from "./ContentItem";
import { max, reps, search, profiles, plus } from "@/assets/images";
import { isTheme } from "@/lib/util/themes";
import Image from "next/image";
import { twJoin } from "tailwind-merge";
import { useState } from "react";

export default function FitnessContent({
  currTab,
  profileData,
}: {
  currTab: string[];
  profileData: ProfileData | null;
}) {
  function handleExerciseCreateClick() {
    const event = new CustomEvent("showFitnessOverlay", {
      detail: { overlay: "createExercise" },
    });
    document.dispatchEvent(event);
  }

  return (
    <>
      <ContentItem
        profileData={profileData}
        destPath={`/${currTab[1]}/fitness/max`}
        image={max}
        text="Max"
        imageSize="h-5/6 w-5/6"
      />
      <ContentItem
        profileData={profileData}
        destPath={`/${currTab[1]}/fitness/reps`}
        image={reps}
        text="Reps"
      />
      <button
        onClick={handleExerciseCreateClick}
        className={twJoin(
          "mt-[-8px] hidden h-14 w-14 rounded-xl shadow-circle-4xl shadow-white  tn:grid tn:place-items-center",
          isTheme("blue", profileData)
            ? "[background:_linear-gradient(32deg,_rgba(175,_0,_92,_1)_0%,_rgba(255,_134,_183,_1)_100%)]"
            : "bg-news"
        )}
      >
        <div className="h-9 w-9">
          <Image src={plus} alt="" />
        </div>
      </button>
      <ContentItem
        profileData={profileData}
        destPath={`/${currTab[1]}/fitness/search`}
        image={search}
        text="Search"
      />
      <ContentItem
        profileData={profileData}
        destPath={`/${currTab[1]}/fitness/profiles`}
        image={profiles}
        text="Profiles"
      />
    </>
  );
}
