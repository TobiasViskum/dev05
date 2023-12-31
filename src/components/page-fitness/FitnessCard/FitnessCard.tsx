import { twJoin, twMerge } from "tailwind-merge";
import ExerciseAmount from "./ExerciseAmount";
import LeftButtons from "./LeftButtons";
import InfoBox from "./InfoBox";
import RightButton from "./RightButtons";
import { SettingsHref } from "./SettingsHref";

interface Props {
  strExerciseData: string;
  stylingData: {
    isTotalExerciseAmountOdd: boolean;
    isExerciseOdd: boolean;
    isSecondLast: boolean;
    isLast: boolean;
  };
}

export default function FitnessCard({ strExerciseData, stylingData }: Props) {
  const exerciseData: FitnessData = JSON.parse(strExerciseData);

  return (
    <div
      className={twJoin(
        "group relative min-w-[300px] overflow-hidden",
        stylingData.isExerciseOdd ? "vsm:-ml-3 vsm:min-w-[322px]" : ""
      )}
    >
      <div className="relative flex min-w-small items-center gap-x-1">
        <div
          className={twJoin(
            "mr-3 hidden h-10 w-[1px] bg-[var(--border-inactive)]",
            stylingData.isExerciseOdd && "vsm:block"
          )}
        />
        <div className="relative my-1.5 grid place-items-center p-1.5">
          <ExerciseAmount exerciseData={exerciseData} />
          <LeftButtons exerciseData={exerciseData} />
        </div>

        <div className="mt-1.5 flex flex-col gap-y-1 overflow-hidden">
          <p
            className={twMerge(
              "overflow-hidden text-ellipsis whitespace-nowrap font-medium",
              exerciseData.name.length > 30 && "py-0.5 text-sm",
              exerciseData.name.length > 45 && "py-1 text-xs"
            )}
          >
            {exerciseData.name}
          </p>
          <div className="flex flex-row gap-x-3">
            <InfoBox exerciseData={exerciseData} />
            <div className="flex items-end gap-x-3">
              <RightButton exerciseData={exerciseData} />
            </div>
          </div>
        </div>
        <SettingsHref strExerciseData={JSON.stringify(exerciseData)} />
      </div>
      <div
        className={twJoin(
          "mt-2 w-full bg-[var(--border-inactive)]",
          stylingData.isLast
            ? "h-0"
            : stylingData.isSecondLast
            ? stylingData.isTotalExerciseAmountOdd
              ? "h-[1px] vsm:h-0"
              : "h-[1px]"
            : "h-[1px]"
        )}
      />
    </div>
  );
}
