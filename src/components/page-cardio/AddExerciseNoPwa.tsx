"use client";

import { plus } from "@/assets/images";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function AddExerciseNoPwa() {
  const path = usePathname();
  const canCreateExercise =
    path.endsWith("running") || path.endsWith("cycling") || path.endsWith("swimming");

  function handleExerciseCreateClick() {
    if (canCreateExercise) {
      const event = new CustomEvent("showCardioOverlay", {
        detail: { overlay: "createExercise" },
      });
      document.dispatchEvent(event);
    }
  }

  return (
    <div className="fixed block bottom-8 z-50 right-8 standalone:touch:hidden">
      <button
        onClick={handleExerciseCreateClick}
        className={twMerge(
          "hidden h-14 w-14 rounded-xl bg-news opacity-100 shadow-circle-4xl shadow-white transition-all tn:grid tn:place-items-center",
          canCreateExercise === false ? "bg-green-900 shadow-none" : "shadow-circle-xl"
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
    </div>
  );
}
