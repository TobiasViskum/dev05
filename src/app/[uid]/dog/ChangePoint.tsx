"use client";

import { useRouter } from "next/navigation";

type Props = {
  changeType: "increment" | "decrement";
  profile: "Tobias" | "Andreas";
};

export function ChangePoint({ changeType, profile }: Props) {
  const router = useRouter();

  const tw =
    "w-6 h-6 bg-gray-500 bg-opacity-20 rounded-md grid place-items-center hover:bg-opacity-40";

  async function onClick() {
    await fetch(`/api/dog?changeType=${changeType}&profile=${profile}`, { method: "POST" });
    router.refresh();
  }

  if (changeType === "increment") {
    return (
      <button onClick={onClick} className={tw}>
        +
      </button>
    );
  }

  return (
    <button onClick={onClick} className={tw}>
      -
    </button>
  );
}
