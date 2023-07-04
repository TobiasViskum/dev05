"use client";

import { useAppDispatch } from "@/store/useClient";
import { setCardioExercise } from "@/store/exerciseStateSlice";

export default function SetReduxState({
  strExerciseData,
  children,
}: {
  strExerciseData: string;
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const exerciseData: CardioData = JSON.parse(strExerciseData);
  dispatch(setCardioExercise(exerciseData));

  return <>{children}</>;
}
