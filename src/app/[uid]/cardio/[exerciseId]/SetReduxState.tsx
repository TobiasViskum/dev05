"use client";

import { useParams } from "next/navigation";
import { useAppDispatch } from "@/store/useClient";
import { setCardioExercise } from "@/store/exerciseStateSlice";

export default function SetReduxState({
  strExerciseData,
}: {
  strExerciseData: string;
}) {
  const dispatch = useAppDispatch();
  const exerciseData: CardioData = JSON.parse(strExerciseData);
  dispatch(setCardioExercise(exerciseData));

  return null;
}
