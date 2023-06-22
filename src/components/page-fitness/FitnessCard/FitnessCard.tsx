import { twJoin } from "tailwind-merge";
import ExerciseAmount from "./ExerciseAmount";
import LeftButtons from "./LeftButtons";
import InfoBox from "./InfoBox";
import Image from "next/image";
import { settingsPng } from "@/assets/images";
import RightButton from "./RightButtons";

interface Props {
  strExerciseData: string;
  isLast: boolean;
  profileData: ProfileData;
}

export default function FitnessCard({
  strExerciseData,
  isLast,
  profileData,
}: Props) {
  const exerciseData: FitnessData = JSON.parse(strExerciseData);

  return (
    <div className="group overflow-hidden">
      <div className="relative flex min-w-small gap-x-3">
        <div className="relative my-1.5 grid place-items-center p-1.5">
          <ExerciseAmount exerciseData={exerciseData} />
          <LeftButtons exerciseData={exerciseData} />
        </div>

        <div className="mt-2.5 flex flex-col gap-y-1 overflow-hidden">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
            {exerciseData.name}
          </p>
          <div className="flex flex-row gap-x-3">
            <InfoBox exerciseData={exerciseData} />
            <div className="flex items-end gap-x-3">
              <RightButton
                exerciseData={exerciseData}
                profileData={profileData}
              />
            </div>
          </div>
        </div>
        <div className="absolute -bottom-1 right-0 h-8 w-8 p-1.5">
          <Image priority src={settingsPng} alt="SET" className="image-blue" />
        </div>
      </div>
      <div
        className={twJoin(
          "mt-2 w-full bg-[var(--border-inactive)]",
          isLast ? "h-0" : "h-[1px]"
        )}
      />
    </div>
  );
}
