import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { edit, locked } from "@/assets/images";

export default function LeftButtons({
  exerciseData,
}: {
  exerciseData: FitnessData;
}) {
  const router = useRouter();
  const [isLocked, setIsLocked] = useState(exerciseData.is_date_locked);

  async function handleLockClick() {
    setIsLocked(isLocked === 1 ? 0 : 1);
    await fetch("/api/fitness/update-lock", {
      method: "POST",
      body: JSON.stringify({
        id: exerciseData.id,
        newState: isLocked === 1 ? 0 : 1,
      }),
    });
    router.refresh();
  }

  function handleEditClick() {
    const event = new CustomEvent("showFitnessOverlay", {
      detail: { overlay: "editAmount", exerciseData: exerciseData },
    });
    document.dispatchEvent(event);
  }

  if (isLocked === 0) {
    return (
      <button
        className="absolute -bottom-2 -right-2 h-8 w-8 p-2 rounded-full"
        onClick={handleEditClick}
      >
        <Image src={edit} alt="edit" className="image-blue" />
      </button>
    );
  } else {
    return (
      <button
        className="absolute -left-2 -top-2 h-8 w-8 p-[9px] rounded-full z-20"
        onClick={handleLockClick}
      >
        <Image src={locked} alt="edit" className="image-blue" />
      </button>
    );
  }
}
