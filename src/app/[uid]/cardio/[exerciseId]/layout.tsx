import { getCardioExercise } from "@/lib/db/cardio";
import SetReduxState from "./setReduxState";

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
    <>
      <SetReduxState strExerciseData={strExerciseData} />
      {children}
    </>
  );
}
