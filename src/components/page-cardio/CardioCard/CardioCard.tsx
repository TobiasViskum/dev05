import { twJoin, twMerge } from "tailwind-merge";
import ExerciseAmount from "./ExerciseAmount";
import LeftButtons from "./LeftButtons";
import InfoBox from "./InfoBox";
import Image from "next/image";
import { settingsPng } from "@/assets/images";
import RightButton from "./RightButtons";
import CardProvider from "./CardProvider";
import Link from "next/link";
import { CardHandler } from "@/components/fitness-cardio";

interface Props {
  strExerciseData: string;
  stylingData: {
    isTotalExerciseAmountOdd: boolean;
    isExerciseOdd: boolean;
    isSecondLast: boolean;
    isLast: boolean;
  };
}

export default function CardioCard({ strExerciseData, stylingData }: Props) {
  const exerciseData: CardioData = JSON.parse(strExerciseData);
  const discipline = exerciseData.discipline_name.toLowerCase();

  return (
    <CardProvider exerciseData={exerciseData}>
      <div
        className={twJoin(
          "group relative min-w-[300px] overflow-hidden",
          stylingData.isExerciseOdd ? "vsm:-ml-3 vsm:min-w-[322px]" : ""
        )}
      >
        <CardHandler>
          <div className="relative flex min-w-small items-center gap-x-1">
            <div
              className={twJoin(
                "ml-2 mr-1 hidden h-10 w-[1px] bg-[var(--border-inactive)]",
                stylingData.isExerciseOdd && "vsm:block"
              )}
            />
            <div className="relative my-1.5 grid place-items-center p-1.5">
              <ExerciseAmount />
              <LeftButtons />
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
                <InfoBox />
                <div className="flex items-end gap-x-3">
                  <RightButton />
                </div>
              </div>
            </div>
            <Link
              href={`/${exerciseData.uid}/cardio/${exerciseData.id}?matcher=${discipline}&prev=/${exerciseData.uid}/cardio/${discipline}`}
              className="absolute -bottom-1 right-0 h-8 w-8 rounded-full p-1.5"
            >
              <Image
                priority
                src={settingsPng}
                alt="SET"
                className="image-blue"
              />
            </Link>
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
        </CardHandler>
      </div>
    </CardProvider>
  );
}
