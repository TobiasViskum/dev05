import { getCardioExercise, getCardioGroupings } from "@/lib/db/cardio";
import SetReduxState from "./SetReduxState";
import { getProfileData } from "@/lib/db";

export default async function CardioSettingsRoot({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { uid: string; exerciseId: string };
}) {
  const [exerciseData, profileData] = await Promise.all([
    getCardioExercise(params.exerciseId),
    getProfileData(params.uid),
  ]);

  const cardioGroupings = await getCardioGroupings(profileData.group_uid);

  return (
    <div className="flex flex-col items-center">
      <SetReduxState
        exerciseData={exerciseData}
        cardioGroupings={cardioGroupings}
      >
        {children}
      </SetReduxState>
    </div>
  );
}
