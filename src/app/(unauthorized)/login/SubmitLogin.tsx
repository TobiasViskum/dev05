"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@/components/global";

export function SubmitLogin() {
  const tw = "mt-6";

  const [submitResponse, setSubmitResponse] = useState(<p className={tw}></p>);
  const [inputText, setInputText] = useState("");
  const isFirstRender = useRef(false);
  const router = useRouter();

  async function handleClick() {
    const responseInput = await fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify({
        input: inputText,
      }),
    });
    const dataInput: {
      success: boolean;
      uid?: string;
      status: string;
    } = await responseInput.json();

    if (dataInput.success) {
      const sessionKey = localStorage.getItem("sessionKey");

      const responseConfirm = await fetch(`/api/login/confirm`, {
        method: "POST",
        body: JSON.stringify({
          uid: dataInput.uid,
          sessionKey: sessionKey,
        }),
      });
      const dataConfirm: {
        newRedirect: string;
        passed: boolean;
        status: string;
      } = await responseConfirm.json();

      if (dataConfirm.status == "error") {
        setSubmitResponse(<p>An error happened</p>);
      } else {
        router.push(dataConfirm.newRedirect);
      }
    } else if (dataInput.status == "error") {
      setSubmitResponse(<p>An error happened</p>);
    } else {
      setSubmitResponse(
        <p className="text-alert">E-mail doesn{"'"}t exist!</p>
      );
    }
  }

  useEffect(() => {
    if (isFirstRender.current == false) {
      isFirstRender.current = true;
    } else {
      setSubmitResponse(<p className={tw}></p>);
    }
  }, [inputText]);

  return (
    <>
      <div className="flex w-full flex-col items-center">
        <Input
          className="w-sm mt-4 w-5/6 min-w-small max-w-small py-4 text-center"
          placeholder="Enter e-mail"
          spellCheck={false}
          onChange={(e) => setInputText(e.currentTarget.value)}
          defaultValue={inputText}
        />
        {submitResponse}
        <Button
          onClick={handleClick}
          className="mt-6 w-4/6 min-w-tiny max-w-tiny text-xl"
        >
          Submit
        </Button>
      </div>
    </>
  );
}
