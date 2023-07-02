"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { edit, locked } from "@/assets/images";
import { useAppDispatch } from "@/store/useClient";
import { setFitnessExercise } from "@/store/exerciseStateSlice";

export default function LeftButtons({
  exerciseData,
}: {
  exerciseData: FitnessData;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(exerciseData.is_date_locked);

  async function handleLockClick() {
    const newState = isLocked === 1 ? 0 : 1;
    const event = new CustomEvent(`updateExerciseLock${exerciseData.id}`);
    document.dispatchEvent(event);
    setIsLocked(newState);
    await fetch("/api/fitness/update-lock", {
      method: "POST",
      body: JSON.stringify({
        id: exerciseData.id,
        newState: newState,
      }),
    });
    router.refresh();
  }

  function handleEditClick() {
    dispatch(setFitnessExercise(exerciseData));
    const event = new CustomEvent("showFitnessOverlay", {
      detail: { overlay: "editAmount" },
    });
    document.dispatchEvent(event);
  }

  if (isLocked === 0) {
    return (
      <button
        className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full p-2"
        onClick={handleEditClick}
      >
        <Image priority src={edit} alt="edit" className="image-blue" />
      </button>
    );
  } else {
    return (
      <button
        className="absolute -left-2 -top-2 h-8 w-8 rounded-full p-[9px]"
        onClick={handleLockClick}
      >
        <Image priority src={locked} alt="edit" className="image-blue" />
      </button>
    );
  }
}
