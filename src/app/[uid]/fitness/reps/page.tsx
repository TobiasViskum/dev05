import { Suspense } from "react";
import { Metadata } from "next";
import { FitnessGroupAndCards } from "@/components/page-fitness";

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
      <div className="grid min-w-small">
        <Suspense fallback={<p>Loading...</p>}>
          <FitnessGroupAndCards uid={uid} />
        </Suspense>
      </div>
      <div className="pt-8" />
    </>
  );
}
