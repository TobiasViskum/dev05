import { usePathname } from "next/navigation";

export default function ExerciseAmount({
  exerciseData,
}: {
  exerciseData: FitnessData;
}) {
  const path = usePathname();
  const splitPath = path.split("/");
  const exerciseType = splitPath[splitPath.length - 1];
  const exerciseAmount =
    exerciseType === "reps" ? exerciseData.reps : exerciseData.max;
  const unit_name = exerciseData.unit_name;
  const UNIT_CONVERTER = 2.20462262;

  function roundToOneDecimal(number: number) {
    return number.toFixed(1).replace(/\.0+$/, "");
  }

  function getExerciseAmount(whatToGet: "primary" | "secondary") {
    if (whatToGet === "primary") {
      return exerciseAmount.toString().replace(".", ",");
    } else if (whatToGet === "secondary") {
      if (unit_name.toLowerCase() === "kg") {
        const amount = exerciseAmount * UNIT_CONVERTER;
        return roundToOneDecimal(amount).replace(".", ",");
      } else if (unit_name.toLowerCase() === "lbs") {
        const amount = exerciseAmount / UNIT_CONVERTER;
        return roundToOneDecimal(amount).replace(".", ",");
      }
    }
  }
  function getExerciseUnit(whatToGet: "primary" | "secondary") {
    if (whatToGet === "primary") {
      if (unit_name === "kg") return "KG";
      return unit_name;
    } else if (whatToGet === "secondary") {
      if (unit_name === "kg") return "lbs";
      if (unit_name === "lbs") return "KG";
    }
  }

  return (
    <div className="grid h-[72px] w-[72px] grid-rows-[50%_50%] justify-center rounded-full border-4 border-solid border-inactive">
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
