import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExerciseAmount({
  exerciseData,
}: {
  exerciseData: FitnessData;
}) {
  const path = usePathname();
  const splitPath = path.split("/");
  const exerciseType = splitPath[splitPath.length - 1];
  const [exerciseAmount, setExerciseAmount] = useState(
    exerciseType === "reps" ? exerciseData.reps : exerciseData.max
  );
  const [unitName, setUnitName] = useState(exerciseData.unit_name);
  const [isLocked, setIsLocked] = useState(exerciseData.is_date_locked);
  const UNIT_CONVERTER = 2.20462262;

  function roundToOneDecimal(number: number) {
    return number.toFixed(1).replace(/\.0+$/, "");
  }

  useEffect(() => {
    document.addEventListener(`updateExercise${exerciseData.id}`, ((
      e: CustomEvent<{
        newAmount: number;
        newUnit: string;
      }>
    ) => {
      setExerciseAmount(e.detail.newAmount);
      setUnitName(e.detail.newUnit);
    }) as EventListener);

    document.addEventListener(`updateExerciseLock${exerciseData.id}`, ((
      e: CustomEvent<{
        newState: number;
      }>
    ) => {
      setIsLocked(e.detail.newState);
    }) as EventListener);
  }, [exerciseData.id]);

  function getExerciseAmount(whatToGet: "primary" | "secondary") {
    if (whatToGet === "primary") {
      return exerciseAmount.toString().replace(".", ",");
    } else if (whatToGet === "secondary") {
      if (unitName.toLowerCase() === "kg") {
        const amount = exerciseAmount * UNIT_CONVERTER;
        return roundToOneDecimal(amount).replace(".", ",");
      } else if (unitName.toLowerCase() === "lbs") {
        const amount = exerciseAmount / UNIT_CONVERTER;
        return roundToOneDecimal(amount).replace(".", ",");
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
      const event = new CustomEvent("showFitnessOverlay", {
        detail: { overlay: "editAmount", exerciseData: exerciseData },
      });
      document.dispatchEvent(event);
    }
  }

  return (
    <div
      className="grid h-[72px] w-[72px] grid-rows-[50%_50%] justify-center rounded-full border-4 border-solid border-inactive cursor-pointer"
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
