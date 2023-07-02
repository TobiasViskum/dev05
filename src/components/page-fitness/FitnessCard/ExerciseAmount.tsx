"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAppDispatch } from "@/store/useClient";
import { setFitnessExercise } from "@/store/exerciseStateSlice";
import { twJoin } from "tailwind-merge";
import { roundToOneDecimal } from "@/lib/util";

export default function ExerciseAmount({
  exerciseData,
}: {
  exerciseData: FitnessData;
}) {
  const dispatch = useAppDispatch();
  const [forceUpdate, setForceUpdate] = useState(false);
  const path = usePathname();
  const splitPath = path.split("/");
  const exerciseType = splitPath[splitPath.length - 1];
  let exerciseAmount =
    exerciseType === "reps" ? exerciseData.reps : exerciseData.max;
  let unitName = exerciseData.unit_name;
  let isLocked = exerciseData.is_date_locked;
  const UNIT_CONVERTER = 2.20462262;

  useEffect(() => {
    document.addEventListener(`updateExercise${exerciseData.id}`, () => {
      setForceUpdate((prev) => !prev);
    });

    document.addEventListener(`updateExerciseLock${exerciseData.id}`, () => {
      setForceUpdate((prev) => !prev);
    });
  }, [exerciseData.id]);

  function getExerciseAmount(whatToGet: "primary" | "secondary") {
    if (whatToGet === "primary") {
      return exerciseAmount.toString().replace(".", ",");
    } else if (whatToGet === "secondary") {
      if (unitName.toLowerCase() === "kg") {
        const amount = exerciseAmount * UNIT_CONVERTER;
        return roundToOneDecimal(amount);
      } else if (unitName.toLowerCase() === "lbs") {
        const amount = exerciseAmount / UNIT_CONVERTER;
        return roundToOneDecimal(amount);
      }
    }
  }
  function getExerciseUnit(whatToGet: "primary" | "secondary") {
    if (whatToGet === "primary") {
      if (unitName.toLowerCase() === "kg") return "KG";
      return unitName;
    } else if (whatToGet === "secondary") {
      if (unitName.toLowerCase() === "kg") return "lbs";
      if (unitName === "lbs") return "KG";
    }
  }

  function handleEditClick() {
    if (isLocked === 0) {
      dispatch(setFitnessExercise(exerciseData));
      const event = new CustomEvent("showFitnessOverlay", {
        detail: { overlay: "editAmount" },
      });
      document.dispatchEvent(event);
    }
  }

  return (
    <div
      className={twJoin(
        "grid h-20 w-20 grid-rows-[50%_50%] justify-center rounded-full border-4 border-solid border-inactive",
        exerciseData.is_date_locked ? "cursor-auto" : "cursor-pointer"
      )}
      onClick={handleEditClick}
    >
      <div className="flex flex-row items-end justify-center gap-x-1">
        <p className="pb-0.5 text-center text-sm leading-3 text-first">
          <b className="font-semibold">{getExerciseAmount("primary")}</b>{" "}
          {getExerciseUnit("primary")}
        </p>
      </div>
      <p className="pt-1 text-center text-3xs text-second">
        {getExerciseAmount("secondary")} {getExerciseUnit("secondary")}
      </p>
    </div>
  );
}
