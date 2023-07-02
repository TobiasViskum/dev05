import { FitnessCard } from "@/components/page-fitness";
import { getCardioData, getProfileData } from "@/lib/db";
import { getCardioGroups } from "@/lib/util";
import CardioGroup from "./CardioGroup/CardioGroup";
import CardioCard from "./CardioCard/CardioCard";

interface Props {
  uid: Uid;
  discipline: "cycling" | "running" | "swimming";
}

export default async function CardioGroupAndCards({ uid, discipline }: Props) {
  const cardioData = await getCardioData(uid);

  const cardioGroup = getCardioGroups(cardioData, discipline);

  return (
    <>
      {cardioGroup.map((group, index) => {
        return (
          <>
            <CardioGroup
              key={index}
              strExercisesInGroup={JSON.stringify(group.exercisesInGroup)}
              groupData={group.groupData}
            >
              {group.exercisesInGroup.map((exercise, index2) => {
                return (
                  <CardioCard
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
            </CardioGroup>
          </>
        );
      })}
    </>
  );
}
