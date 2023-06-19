"use client";
import { setDarkTheme, setBlueTheme } from "@/lib/util/themes";
import { useRouter } from "next/navigation";

import { Button } from "../global";

interface Props {
  profileData: ProfileData;
}

export function ColorThemes({ profileData }: Props) {
  const router = useRouter();

  function setTheme(newTheme: string) {
    fetch("/api/update-color-theme", {
      method: "POST",
      body: JSON.stringify({ profileData: profileData, newTheme: newTheme }),
    });
    if (newTheme === "dark") {
      setDarkTheme();
    } else if (newTheme === "blue") {
      setBlueTheme();
    }
    localStorage.setItem("theme", newTheme);
    router.refresh();
  }

  return (
    <>
      <div className="grid grid-flow-col gap-x-4">
        <Button onClick={() => setTheme("dark")} className="px-4 text-first">
          Dark
        </Button>
        <Button onClick={() => setTheme("blue")} className="px-4 text-first">
          Blue
        </Button>
        <Button className="px-4 text-first">Other</Button>
      </div>
    </>
  );
}
