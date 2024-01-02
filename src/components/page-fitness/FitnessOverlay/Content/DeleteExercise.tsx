"use client";

import { Button } from "@/components/global/Button";
import { Input } from "@/components/global/Input";
import { useAppDispatch, useAppSelector } from "@/store/useClient";
import { useState, useRef } from "react";
import {} from "../FitnessOverlay";
import { setFitnessData } from "@/store/userDataSlice";
import { useRouter, useSearchParams } from "next/navigation";

export default function DeleteExercise() {
  const [input, setInput] = useState("");
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const matcher = searchParams.get("matcher");
  const router = useRouter();

  const profileData = useAppSelector((state) => state.userData.profileData);
  const fitnessData = useAppSelector((state) => state.appState.fitnessExercise);
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleClick() {
    if (input === profileData.password) {
      const event = new CustomEvent("showFitnessOverlay", {
        detail: { overlay: "loading" },
      });
      document.dispatchEvent(event);

      await fetch("/api/fitness/delete-exercise", {
        method: "POST",
        body: JSON.stringify({
          id: fitnessData.id,
          profile: profileData.uid,
        }),
      });
      const event2 = new CustomEvent("showFitnessOverlay", {
        detail: { overlay: "animation" },
      });
      document.dispatchEvent(event2);

      router.replace(`/${profileData.uid}/fitness/${matcher ? ["/", matcher].join("") : ""}`);

      const response = await fetch(
        `/api/redux-store?uid=${profileData.uid}&getSpecific=fitnessData`
      );
      const result: { fitnessData: FitnessData[] } = await response.json();
      dispatch(setFitnessData(result.fitnessData));

      setTimeout(() => {
        setInput("");
        router.refresh();
        const event3 = new CustomEvent("showFitnessOverlay", {
          detail: { overlay: "" },
        });
        document.dispatchEvent(event3);
      }, 1250);
    }
  }

  return (
    <>
      <div className="mx-10 flex flex-col items-center gap-y-2">
        <div className="text-center">
          <p className="mt-2 text-second">DELETE EXERCISE</p>
          <h3 className="text-lg font-semibold">Confirmation</h3>
        </div>
        <div className="grid gap-y-2">
          <form>
            <fieldset className="w-full rounded-md border-2 border-solid border-inactive bg-first">
              <legend className="ml-2 mr-auto px-1 text-base font-bold leading-none text-second">
                Password
              </legend>
              <Input
                ref={inputRef}
                value={input}
                applyAutocompleteStyling
                type="password"
                name="password"
                autoComplete="current-password"
                spellCheck={false}
                placeholder={""}
                styling={{
                  main: "w-full border-none bg-first py-0 pb-2 text-sm text-first placeholder-[var(--text-second)] focus:outline-0",
                }}
                maxCharacters={45}
                onChange={(e) => setInput(e.target.value)}
              />
            </fieldset>
          </form>
        </div>
        <Button
          insideModal
          styling={{
            main: "mb-4 mt-3 w-1/2 rounded-lg text-sm py-1 bg-[rgba(var(--text-active-preset),_1)] border-none transition-colors",
            disabled: "bg-[rgba(var(--text-active-preset),_0.3)] text-second focus:outline-0",
          }}
          disabled={input === profileData.password ? false : true}
          onClick={handleClick}
        >
          Delete
        </Button>
      </div>
    </>
  );
}
