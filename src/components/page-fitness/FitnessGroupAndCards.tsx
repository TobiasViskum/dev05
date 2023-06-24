import { FitnessCard, FitnessGroup } from "@/components/page-fitness";
import { getFitnessData, getProfileData } from "@/lib/db";
import { getFitnessGroups } from "@/lib/util";
import { redirect } from "next/navigation";

interface Props {
  uid: string;
  type: "reps" | "max";
}

export default async function FitnessGroupAndCards({ uid, type }: Props) {
  const [fitnessData, profileData] = await Promise.all([
    getFitnessData(uid),
    getProfileData(uid),
  ]);
  if (profileData === null) {
    redirect("/");
  }

  const fitnessGroups = getFitnessGroups(fitnessData, type);

  return (
    <>
      {fitnessGroups.map((group, index) => {
        return (
          <>
            <FitnessGroup
              key={index}
              strExercisesInGroup={JSON.stringify(group.exercisesInGroup)}
              groupData={group.groupData}
            >
              {group.exercisesInGroup.map((exercise, index2) => {
                return (
                  <FitnessCard
                    key={index2}
                    strExerciseData={JSON.stringify(exercise)}
                    stylingData={{
                      isTotalExerciseAmountOdd:
                        group.exercisesInGroup.length % 2 === 0,
                      isExerciseOdd: (index2 + 1) % 2 === 0,
                      isSecondLast:
                        group.exercisesInGroup.length - 2 === index2,
                      isLast: group.exercisesInGroup.length - 1 === index2,
                    }}
                  />
                );
              })}
            </FitnessGroup>
          </>
        );
      })}
    </>
  );
}
