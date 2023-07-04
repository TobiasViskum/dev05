import { getCardioExercise } from "@/lib/db/cardio";
import SetReduxState from "./SetReduxState";

export default async function CardioSettingsRoot({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { uid: string; exerciseId: string };
}) {
  const exerciseData = await getCardioExercise(params.exerciseId);
  const strExerciseData = JSON.stringify(exerciseData);

  return (
    <div className="flex flex-col items-center">
      <SetReduxState strExerciseData={strExerciseData}>
        {children}
      </SetReduxState>
    </div>
  );
}
