"use client";

import { Input } from "@/components/global/Input";
import { useState } from "react";
import { twJoin } from "tailwind-merge";
import styles from "./CreateExercise.module.scss";
import { Button } from "@/components/global/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { set } from "zod";
import { setFitnessExercise } from "@/store/appStateSlice";
import { useAppDispatch } from "@/store/useClient";

export function Content({ strFitnessData }: { strFitnessData: string }) {
  const router = useRouter();
  const exercise: FitnessData = JSON.parse(strFitnessData);
  const serarchParams = useSearchParams();
  const [name, setName] = useState("");
  const [isCompeting, setIsCompeting] = useState(!!exercise.is_competing);
  const [isReps, setIsReps] = useState(!!exercise.has_reps);
  const [isMax, setIsMax] = useState(!!exercise.has_max);
  const [isLocked, setIsLocked] = useState(!!exercise.is_date_locked);
  const dispatch = useAppDispatch();

  dispatch(setFitnessExercise(exercise));

  async function handleClick() {
    const event = new CustomEvent("showFitnessOverlay", {
      detail: { overlay: "deleteExercise" },
    });
    document.dispatchEvent(event);
  }

  async function handleSave() {
    const event1 = new CustomEvent("showFitnessOverlay", {
      detail: { overlay: "loading" },
    });
    document.dispatchEvent(event1);

    const time1 = new Date().getTime();

    await fetch("/api/fitness/update-exercise", {
      method: "POST",
      body: JSON.stringify({
        profile: exercise.uid,
        id: exercise.id,
        newName: name == "" ? exercise.name : name,
        isCompeting: isCompeting,
        isReps: isReps,
        isMax: isMax,
        isLocked: isLocked,
      }),
    });

    const waitTime = 1500 - (new Date().getTime() - time1);
    setTimeout(
      () => {
        const event2 = new CustomEvent("showFitnessOverlay", {
          detail: { overlay: "animation" },
        });
        document.dispatchEvent(event2);

        setTimeout(() => {
          const event3 = new CustomEvent("showFitnessOverlay", {
            detail: { overlay: "" },
          });
          document.dispatchEvent(event3);
          router.refresh();
        }, 1250);
      },
      waitTime < 0 ? 0 : waitTime
    );
  }

  return (
    <div className="flex w-full xl:max-w-2xl flex-col items-center">
      <h1 className="mt-2 text-center text-lg [text-wrap:_balance] tn:text-2xl">{exercise.name}</h1>
      <div className="mb-6 h-2 w-48 border-b border-inactive" />
      <div className="flex h-full w-full flex-col items-center gap-y-4 px-4">
        <div className="flex w-full max-w-2xl items-center justify-center">
          <p className="w-20">Name:</p>
          <Input
            spellCheck={false}
            focusNextInputOnEnter
            smartFocusNextInput
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxCharacters={45}
            styling={{
              main: "w-full border-inactive bg-first text-first placeholder-[var(--text-second)]",
            }}
            placeholder={exercise.name}
          />
        </div>
        <div className="flex w-full max-w-2xl items-center justify-center">
          <p className="w-[232px]">Is competing:</p>
          <input
            className={styles.input}
            onChange={() => setIsCompeting((prev) => !prev)}
            checked={isCompeting}
            type="checkbox"
          />
        </div>
        <div className="flex w-full max-w-2xl items-center justify-center">
          <p className="w-[232px]">Is reps:</p>
          <input
            className={styles.input}
            onChange={() => setIsReps((prev) => !prev)}
            checked={isReps}
            type="checkbox"
          />
        </div>
        <div className="flex w-full max-w-2xl items-center justify-center">
          <p className="w-[232px]">Is max:</p>
          <input
            className={styles.input}
            onChange={() => setIsMax((prev) => !prev)}
            checked={isMax}
            type="checkbox"
          />
        </div>
        <div className="flex w-full max-w-2xl items-center justify-center">
          <p className="w-[232px]">Locked:</p>
          <input
            className={styles.input}
            onChange={() => setIsLocked((prev) => !prev)}
            checked={isLocked}
            type="checkbox"
          />
        </div>
        <div
          className={twJoin(
            "flex w-full max-w-2xl flex-col items-center justify-center gap-x-4 gap-y-6 tn:flex-row tn:gap-y-0"
          )}
        ></div>
        <div className="flex gap-x-8 mt-32">
          <Button
            onClick={handleSave}
            styling={{
              main: "h-10 w-24 text-xs font-semibold rounded-lg border-none shadow-md bg-[var(--text-news)] focus:outline-white",
            }}
          >
            Save
          </Button>
          <Button
            onClick={handleClick}
            styling={{
              main: "h-10 w-24 text-xs font-semibold rounded-lg border-none shadow-md bg-[var(--text-alert)] focus:outline-white",
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
