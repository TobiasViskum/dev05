import { FitnessCard, FitnessGroup } from "@/components/page-fitness";

interface Props {
  fitnessGroups: {
    groupData: {
      name: string;
      id: number;
    };
    exercisesInGroup: FitnessData[];
    profileData: ProfileData;
  }[];
}

export default function FitnessGroupAndCards({ fitnessGroups }: Props) {
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
