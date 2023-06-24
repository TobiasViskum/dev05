import { Suspense } from "react";
import { Metadata } from "next";
import {
  FitnessGroupAndCards,
  RepsMaxLoadingSkeleton,
} from "@/components/page-fitness";
import { PageWrapper } from "@/components/global";

export const metadata: Metadata = {
  title: {
    absolute: "Fitness | Reps",
  },
};

export default async function RepsPage({ params }: ViskumAppParams) {
  const uid = params.uid;

  return (
    <PageWrapper>
      <div className="mb-4 flex items-center gap-x-3">
        <h1 className="text-3xl">Exercises</h1>
        <p className="text-second">{"|"}</p>
        <h1 className="text-3xl">Reps</h1>
      </div>
      <div className="grid min-w-small vsm:gap-y-3">
        <Suspense fallback={<RepsMaxLoadingSkeleton />}>
          <FitnessGroupAndCards uid={uid} type="reps" />
        </Suspense>
      </div>
      <div className="pt-8" />
    </PageWrapper>
  );
}
