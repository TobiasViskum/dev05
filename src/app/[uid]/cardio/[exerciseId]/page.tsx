import { getCardioExercise } from "@/lib/db/cardio";
import Link from "next/link";
import { twJoin } from "tailwind-merge";

export default async function page({ params }: ExtendedViskumAppParams) {
  const uid = params.uid;
  const exerciseId = params.exerciseId;

  const exerciseData = await getCardioExercise(exerciseId);

  return (
    <>
      <h1 className="mt-2 text-lg tn:text-2xl">{exerciseData.name}</h1>
      <div className="h-3 w-32 border-b border-inactive" />
      <div className="flex flex-col gap-y-2">
        <div>
          <p>Name:</p>
        </div>
      </div>
    </>
  );
}
