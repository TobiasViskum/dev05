"use client";

import { useAppDispatch } from "@/store/useClient";
import { setCardioExercise, setCardioUnits } from "@/store/appStateSlice";
import { setCardioGroupings } from "@/store/appStateSlice";

export default function SetReduxState({
  exerciseData,
  cardioGroupings,
  cardioUnits,
  children,
}: {
  exerciseData: CardioData;
  cardioGroupings: CardioGroupings[];
  cardioUnits: CardioUnits[];
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  dispatch(setCardioUnits(cardioUnits));
  dispatch(setCardioExercise(exerciseData));
  dispatch(setCardioGroupings(cardioGroupings));

  return <>{children}</>;
}
