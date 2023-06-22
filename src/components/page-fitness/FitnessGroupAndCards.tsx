import { FitnessCard, FitnessGroup } from "@/components/page-fitness";
import { getFitnessData, getProfileData } from "@/lib/db";
import { getFitnessGroups } from "@/lib/util";

interface Props {
  uid: string;
}

export default async function FitnessGroupAndCards({ uid }: Props) {
  const [fitnessData, profileData] = await Promise.all([
    getFitnessData(uid),
    getProfileData(uid),
  ]);
  if (profileData === null) return <></>;

  const fitnessGroups = getFitnessGroups(fitnessData, "max", profileData);

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
                    isLast={group.exercisesInGroup.length - 1 === index2}
                    profileData={group.profileData}
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
