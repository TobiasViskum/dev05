"use client";

import { useAppSelector } from "@/store/useClient";
import { usePathname, useRouter } from "next/navigation";
import styles from "./CreateExercise.module.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setFitnessData } from "@/store/userDataSlice";

interface Props {
  closeOverlay: () => void;
  changeActiveOverlay: (newOverlay: Overlay) => void;
}

export default function CreateExercise({ closeOverlay, changeActiveOverlay }: Props) {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useDispatch();

  const [reps, setReps] = useState(path.endsWith("reps"));
  const [max, setMax] = useState(path.endsWith("max"));
  const [exerciseName, setExerciseName] = useState("");
  const [showRemainingExercises, setShowRemainingExercises] = useState(false);
  const [remainingExercises, setRemainingExercises] = useState<FitnessData[] | null>(null);

  const profileData = useAppSelector((state) => state.userData.profileData);

  useEffect(() => {
    async function getRemainingExercises() {
      await fetch(`/api/fitness/get-remaining-exercises?profile=${profileData.uid}`)
        .then((res) => res.json())
        .then((data) => {
          setRemainingExercises(data.data);
        });
    }
    getRemainingExercises();
  }, [profileData.uid]);

  const filteredExercises = remainingExercises
    ? remainingExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(exerciseName.toLowerCase())
      )
    : [];

  async function handleSaveClick() {
    changeActiveOverlay("loading");
    await fetch("/api/fitness/add-exercise", {
      method: "POST",
      body: JSON.stringify({
        profile: profileData.uid,
        name: exerciseName,
        addMax: max,
        addReps: reps,
      }),
    });
    const response = await fetch(`/api/redux-store?uid=${profileData.uid}&getSpecific=fitnessData`);
    const result: { cardioData: FitnessData[] } = await response.json();
    dispatch(setFitnessData(result.cardioData));

    setTimeout(() => {
      router.refresh();
      changeActiveOverlay("animation");
    }, 200);
  }

  return (
    <>
      <div className="mx-10 flex flex-col items-center gap-y-3 mb-4">
        <div className="text-center">
          <p className="text-second">NEW</p>
          <h3 className="text-lg font-semibold">Fitness Exercise</h3>
        </div>
        <div className="grid gap-y-3">
          <div className="flex justify-between gap-x-4">
            <p>Max</p>
            <input
              onChange={() => setMax((prev) => !prev)}
              checked={max}
              type="checkbox"
              className={styles.input}
            />
          </div>
          <div className="flex justify-between gap-x-4">
            <p>Reps</p>
            <input
              onChange={() => setReps((prev) => !prev)}
              checked={reps}
              type="checkbox"
              className={styles.input}
            />
          </div>
        </div>
        <div className="pt-4 space-y-2">
          <p>Exercise name:</p>
          <input
            onFocus={() => setShowRemainingExercises(true)}
            onBlur={() => setShowRemainingExercises(false)}
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            className="rounded-md bg-black text-white w-40 px-1 border-neutral-800 border-2 text-sm h-8 text-center placeholder-neutral-700 focus:outline-none focus:border-neutral-600"
            placeholder="name..."
          />
          <div
            className={`h-28 overflow-y-scroll w-44 transition-opacity  ${
              showRemainingExercises ? "opacity-100" : "opacity-0"
            }`}
          >
            {remainingExercises ? (
              remainingExercises.length > 0 ? (
                <div className="flex flex-col gap-y-1 px-1 w-full items-center">
                  {filteredExercises.length > 0 ? (
                    filteredExercises.map((exercise, index) => {
                      return (
                        <button
                          className="bg-black border-2 border-neutral-800 rounded-md h-8 px-1 w-full text-ellipsis overflow-hidden whitespace-nowrap text-sm"
                          onClick={() => setExerciseName(exercise.name)}
                          key={index}
                        >
                          {exercise.name}
                        </button>
                      );
                    })
                  ) : (
                    <button className="bg-black border-2 border-neutral-800 rounded-md h-8 px-1 w-full text-ellipsis overflow-hidden whitespace-nowrap text-sm">
                      Create: {exerciseName}
                    </button>
                  )}
                </div>
              ) : (
                <p>No exercises remaining</p>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <button
            onClick={handleSaveClick}
            className="bg-[var(--bg-second)] border-2 border-[var(--bg-third)] w-32 h-8 rounded-md"
          >
            Add exercise
          </button>
        </div>
      </div>
    </>
  );
}
