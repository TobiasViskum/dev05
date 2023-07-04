"use client";

import { useAppDispatch } from "@/store/useClient";
import { setCardioExercise } from "@/store/appStateSlice";
import { setCardioGroupings } from "@/store/appStateSlice";

export default function SetReduxState({
  exerciseData,
  cardioGroupings,
  children,
}: {
  exerciseData: CardioData;
  cardioGroupings: CardioGroupings[];
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  dispatch(setCardioExercise(exerciseData));
  dispatch(setCardioGroupings(cardioGroupings));

  return <>{children}</>;
}
