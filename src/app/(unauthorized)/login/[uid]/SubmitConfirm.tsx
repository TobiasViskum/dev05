"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input, Button } from "@/components/global";

interface Props {
  uid: string;
}

export function SubmitConfirm(props: Props) {
  const tw = "mt-6";

  const [submitResponse, setSubmitResponse] = useState(<p className={tw}></p>);
  const [inputText, setInputText] = useState("");
  const isFirstRender = useRef(false);
  const router = useRouter();

  const uid = props.uid;

  async function handleClick() {
    const responseInput = await fetch(`/api/login/confirm/session`, {
      method: "POST",
      body: JSON.stringify({
        inputText: inputText,
        uid: uid,
      }),
    });
    const dataInput: { passed: boolean; sessionKey: string; status: string } =
      await responseInput.json();

    if (dataInput.passed) {
      localStorage.setItem("sessionKey", dataInput.sessionKey);
      router.push(`/${uid}?status=refresh`);
    } else if (dataInput.status == "error") {
      setSubmitResponse(<p className="text-alert">An error happened</p>);
    } else {
      setSubmitResponse(<p className="text-alert">Wrong password</p>);
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
          placeholder="Enter password"
          spellCheck={false}
          onChange={(e) => setInputText(e.currentTarget.value)}
          defaultValue={inputText}
        />
        {submitResponse}
        <Button
          onClick={handleClick}
          className="mt-6 w-4/6 min-w-tiny max-w-tiny text-2xl"
        >
          Submit
        </Button>
      </div>
    </>
  );
}
