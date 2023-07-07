import { Suspense } from "react";
import { Metadata } from "next";
import { FitnessGroupAndCards } from "@/components/page-fitness";
import { GroupHolder, LoadingSkeleton } from "@/components/fitness-cardio";

export const metadata: Metadata = {
  title: {
    absolute: "Fitness | Reps",
  },
};

export default async function RepsPage({ params }: ViskumAppParams) {
  const uid = params.uid;

  return (
    <>
      <div className="mb-4 flex items-center gap-x-3">
        <h1 className="text-3xl">Exercises</h1>
        <p className="text-second">{"|"}</p>
        <h1 className="text-3xl">Reps</h1>
      </div>
      <GroupHolder>
        <Suspense fallback={<LoadingSkeleton />}>
          <FitnessGroupAndCards uid={uid} type="reps" />
        </Suspense>
      </GroupHolder>
      <div className="pt-8" />
    </>
  );
}
