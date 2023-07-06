"use client";

import { Button } from "@/components/global/Button";

export default function Delete() {
  function handleClick() {
    const event = new CustomEvent("showCardioOverlay", {
      detail: { overlay: "deleteExercise" },
    });
    document.dispatchEvent(event);
  }

  return (
    <>
      <Button
        onClick={handleClick}
        styling={{
          main: "h-10 w-24 text-xs font-semibold rounded-lg border-none mt-auto shadow-md bg-[var(--text-active)] mb-20 focus:outline-white",
        }}
      >
        Delete
      </Button>
    </>
  );
}
