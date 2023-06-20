import { Metadata } from "next";
import { getFitnessData, getProfileData } from "@/lib/db";
import { getFitnessGroups } from "@/lib/util";

export const metadata: Metadata = {
  title: {
    absolute: "Fitness | Reps",
  },
};

export default async function RepsPage({ params }: ViskumAppParams) {
  const uid = params.uid;

  const [fitnessData, profileData] = await Promise.all([
    getFitnessData(uid),
    getProfileData(uid),
  ]);
  if (profileData === null) return <></>;
  return (
    <>
      <div className="mb-4 flex items-center gap-x-3">
        <h1 className="text-3xl">Exercises</h1>
        <p className="text-second">{"|"}</p>
        <h1 className="text-3xl">Reps</h1>
      </div>
      <div className="grid min-w-small">
        {getFitnessGroups(fitnessData, "reps", profileData)}
      </div>
      <div className="pt-8" />
    </>
  );
}
