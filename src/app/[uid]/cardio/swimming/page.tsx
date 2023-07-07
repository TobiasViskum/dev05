import { Suspense } from "react";
import { Metadata } from "next";
import { CardioGroupAndCards } from "@/components/page-cardio";
import { GroupHolder, LoadingSkeleton } from "@/components/fitness-cardio";

export const metadata: Metadata = {
  title: {
    absolute: "Cardio | Swimming",
  },
};

export default async function SwimmingPage({ params }: ViskumAppParams) {
  const uid = params.uid;

  return (
    <>
      <div className="mb-4 flex items-center gap-x-3">
        <h1 className="text-3xl">Swimming</h1>
      </div>
      <GroupHolder>
        <Suspense fallback={<LoadingSkeleton />}>
          <CardioGroupAndCards uid={uid} discipline="swimming" />
        </Suspense>
      </GroupHolder>
      <div className="pt-8" />
    </>
  );
}
