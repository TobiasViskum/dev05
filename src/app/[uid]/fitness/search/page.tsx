import { GroupHolder, LoadingSkeleton } from "@/components/fitness-cardio";
import { FitnessGroupAndCards } from "@/components/page-fitness";
import { getFitnessData } from "@/lib/db";
import { get } from "http";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: {
    absolute: "Fitness | Search",
  },
};

export default async function SearchPage({ params }: ViskumAppParams) {
  const uid = params.uid;

  const allFitnessExercises = await getFitnessData(uid);

  return (
    <div className="flex flex-col gap-y-4">
      <h1 className="text-3xl">Søg efter øvelse</h1>
      {/* <GroupHolder>
        <Suspense fallback={<LoadingSkeleton />}>
          <FitnessGroupAndCards uid={uid} type="max" />
        </Suspense>
      </GroupHolder> */}
    </div>
  );
}
