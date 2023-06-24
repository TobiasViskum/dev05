import { FitnessCard, FitnessGroup } from "@/components/page-fitness";
import { getFitnessData, getProfileData } from "@/lib/db";
import { getFitnessGroups } from "@/lib/util";
import { redirect } from "next/navigation";
import { store } from "@/store";

interface Props {
  uid: string;
  type: "reps" | "max";
}

export default async function FitnessGroupAndCards({ uid, type }: Props) {
  const profileData = store.getState().userData.profileData;
  const fitnessData = store.getState().userData.fitnessData;

  const fitnessGroups = getFitnessGroups(fitnessData, type, profileData);

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
